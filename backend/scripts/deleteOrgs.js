// Dev utility: hard-delete one or more organizations and all their data.
// Usage: node scripts/deleteOrgs.js <orgId> [orgId...]
// Refuses to run with no IDs. Prints a summary and requires typed confirmation.

import pkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import readline from "node:readline";

const { PrismaClient } = pkg;
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

function ask(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(question, (a) => { rl.close(); resolve(a); }));
}

async function main() {
  const ids = process.argv.slice(2).map((n) => parseInt(n, 10));

  if (ids.length === 0 || ids.some((n) => Number.isNaN(n))) {
    console.error("Refusing to run: provide one or more numeric org IDs.");
    console.error("Usage: node scripts/deleteOrgs.js <orgId> [orgId...]");
    process.exit(1);
  }

  const orgs = await prisma.organization.findMany({
    where: { id: { in: ids } },
    include: {
      staff: { select: { email: true } },
      _count: { select: { youth: true, behaviors: true, prizes: true } },
    },
    orderBy: { id: "asc" },
  });

  const found = orgs.map((o) => o.id);
  const missing = ids.filter((id) => !found.includes(id));
  if (missing.length) console.error("These IDs do not exist and will be skipped:", missing.join(", "));
  if (orgs.length === 0) { console.error("No matching orgs found. Nothing to do."); process.exit(1); }

  console.log("\nAbout to PERMANENTLY DELETE these organizations:\n");
  for (const o of orgs) {
    console.log(`  id ${o.id} | ${o.name} | admins: ${o.staff.map((s) => s.email).join(", ") || "(none)"}`);
    console.log(`     youth: ${o._count.youth}, behaviors: ${o._count.behaviors}, prizes: ${o._count.prizes}`);
  }

  const answer = await ask('\nType "yes" to delete the above, anything else to cancel: ');
  if (answer.trim().toLowerCase() !== "yes") { console.log("Cancelled. Nothing was deleted."); process.exit(0); }

  const targetIds = orgs.map((o) => o.id);

  await prisma.$transaction([
    prisma.pointTransaction.deleteMany({ where: { youth: { organizationId: { in: targetIds } } } }),
    prisma.redemption.deleteMany({ where: { youth: { organizationId: { in: targetIds } } } }),
    prisma.behaviorRequest.deleteMany({ where: { organizationId: { in: targetIds } } }),
    prisma.behavior.deleteMany({ where: { organizationId: { in: targetIds } } }),
    prisma.prize.deleteMany({ where: { organizationId: { in: targetIds } } }),
    prisma.youth.deleteMany({ where: { organizationId: { in: targetIds } } }),
    prisma.staff.deleteMany({ where: { organizationId: { in: targetIds } } }),
    prisma.organization.deleteMany({ where: { id: { in: targetIds } } }),
  ]);

  console.log(`\nDeleted ${targetIds.length} org(s): ${targetIds.join(", ")}`);
}

main()
  .catch((e) => { console.error("Error, transaction rolled back:", e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
