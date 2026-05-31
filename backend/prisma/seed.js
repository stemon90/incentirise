import pkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const { PrismaClient } = pkg;
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const defaultBehaviors = [
  {
    name: "Helped clean up",
    description: "Cleaned up the room or common area",
    minPoints: 1,
    maxPoints: 5,
  },
  {
    name: "Helped a friend",
    description: "Assisted another youth with a task or problem",
    minPoints: 1,
    maxPoints: 5,
  },
  {
    name: "Showed respect to staff",
    description: "Demonstrated respectful behavior toward staff members",
    minPoints: 1,
    maxPoints: 3,
  },
  {
    name: "Completed homework",
    description: "Finished homework during homework time",
    minPoints: 2,
    maxPoints: 5,
  },
  {
    name: "Helped hand out snacks",
    description: "Assisted with snack distribution",
    minPoints: 1,
    maxPoints: 3,
  },
  {
    name: "Picked up trash",
    description: "Picked up litter without being asked",
    minPoints: 1,
    maxPoints: 3,
  },
  {
    name: "Was first in line",
    description: "Lined up quickly and orderly",
    minPoints: 1,
    maxPoints: 2,
  },
  {
    name: "Showed leadership",
    description: "Led by example or helped organize peers",
    minPoints: 3,
    maxPoints: 8,
  },
  {
    name: "Helped a new member feel welcome",
    description: "Went out of their way to include or welcome a new youth",
    minPoints: 3,
    maxPoints: 8,
  },
  {
    name: "Participated in an activity",
    description: "Actively engaged in a scheduled activity",
    minPoints: 1,
    maxPoints: 5,
  },
  {
    name: "Went above and beyond",
    description: "Exceptional effort or behavior that stood out",
    minPoints: 5,
    maxPoints: 10,
  },
  {
    name: "Resolved a conflict peacefully",
    description: "Handled a disagreement calmly and respectfully",
    minPoints: 3,
    maxPoints: 8,
  },
  {
    name: "Encouraged a peer",
    description: "Motivated or supported another youth",
    minPoints: 2,
    maxPoints: 5,
  },
  {
    name: "Took care of equipment",
    description: "Handled club equipment responsibly",
    minPoints: 1,
    maxPoints: 4,
  },
  {
    name: "Arrived on time",
    description: "Was present and ready at the start of the program",
    minPoints: 1,
    maxPoints: 2,
  },
];

const defaultPrizes = [
  {
    name: "Wooden Pencil",
    description: "A classic pencil from the prize bin",
    pointCost: 5,
    quantity: 50,
    requiresAdmin: false,
  },
  {
    name: "Cool Eraser",
    description: "A fun shaped eraser",
    pointCost: 10,
    quantity: 50,
    requiresAdmin: false,
  },
  {
    name: "Fidget Spinner",
    description: "A fidget spinner from the prize bin",
    pointCost: 25,
    quantity: 20,
    requiresAdmin: false,
  },
  {
    name: "Bag of Chips",
    description: "A snack bag of chips",
    pointCost: 30,
    quantity: 30,
    requiresAdmin: false,
  },
  {
    name: "Soda",
    description: "A can or bottle of soda",
    pointCost: 30,
    quantity: 30,
    requiresAdmin: false,
  },
  {
    name: "Choose the Activity",
    description: "Youth gets to pick the group activity for the day",
    pointCost: 50,
    quantity: 5,
    requiresAdmin: false,
  },
  {
    name: "Snack Helper Pass",
    description: "Gets to help hand out snacks for a week",
    pointCost: 50,
    quantity: 5,
    requiresAdmin: false,
  },
  {
    name: "First in Line Pass",
    description: "First in line for one week",
    pointCost: 50,
    quantity: 5,
    requiresAdmin: false,
  },
  {
    name: "Mid-Size Teddy Bear",
    description: "A stuffed animal from the prize bin",
    pointCost: 75,
    quantity: 10,
    requiresAdmin: false,
  },
  {
    name: "Connect Four",
    description: "The classic Connect Four board game",
    pointCost: 100,
    quantity: 5,
    requiresAdmin: false,
  },
  {
    name: "Field Trip Pass",
    description: "Guaranteed spot on the next field trip",
    pointCost: 150,
    quantity: 10,
    requiresAdmin: false,
  },
  {
    name: "Mountain Bike",
    description: "A full size mountain bike",
    pointCost: 500,
    quantity: 2,
    requiresAdmin: true,
  },
  {
    name: "PlayStation 5",
    description: "A PS5 console",
    pointCost: 1500,
    quantity: 1,
    requiresAdmin: true,
  },
  {
    name: "Xbox Series X",
    description: "An Xbox Series X console",
    pointCost: 1500,
    quantity: 1,
    requiresAdmin: true,
  },
];

async function main() {
  console.log("Seeding default behaviors and prizes for all organizations...");

  const organizations = await prisma.organization.findMany();

  for (const org of organizations) {
    // Seed behaviors
    for (const behavior of defaultBehaviors) {
      await prisma.behavior.upsert({
        where: {
          // Use name + orgId as unique identifier
          id: -1, // force create path
        },
        update: {},
        create: {
          ...behavior,
          organizationId: org.id,
          isDefault: true,
        },
      });
    }

    // Seed prizes
    for (const prize of defaultPrizes) {
      await prisma.prize.upsert({
        where: {
          id: -1,
        },
        update: {},
        create: {
          ...prize,
          organizationId: org.id,
        },
      });
    }

    console.log(`Seeded org: ${org.name}`);
  }

  console.log("Done.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
