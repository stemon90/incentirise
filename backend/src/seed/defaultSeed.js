export async function seedDefaultData(prisma, organizationId) {
  const behaviors = [
    // Attendance & Participation
    {
      name: "Signed in / Attended today",
      description: "Youth showed up and signed in",
      minPoints: 1,
      maxPoints: 1,
      isDefault: true,
    },
    {
      name: "Completed homework / Power Hour",
      description:
        "Youth completed their homework or participated in Power Hour",
      minPoints: 3,
      maxPoints: 10,
      isDefault: true,
    },
    {
      name: "Participated in an activity",
      description: "Youth actively engaged in a program activity",
      minPoints: 3,
      maxPoints: 10,
      isDefault: true,
    },
    {
      name: "Read independently",
      description: "Youth read on their own during free or structured time",
      minPoints: 3,
      maxPoints: 8,
      isDefault: true,
    },
    {
      name: "Stayed engaged for the full session",
      description: "Youth remained focused and present throughout the program",
      minPoints: 3,
      maxPoints: 8,
      isDefault: true,
    },
    {
      name: "Tried something new",
      description:
        "Youth stepped outside their comfort zone and attempted something unfamiliar",
      minPoints: 3,
      maxPoints: 8,
      isDefault: true,
    },

    // Academic
    {
      name: "Asked for help when stuck",
      description: "Youth demonstrated self-advocacy by asking for assistance",
      minPoints: 3,
      maxPoints: 5,
      isDefault: true,
    },
    {
      name: "Helped a peer with homework",
      description: "Youth supported another member with their schoolwork",
      minPoints: 5,
      maxPoints: 10,
      isDefault: true,
    },
    {
      name: "Improved on a previous attempt",
      description: "Youth showed growth by doing better than before",
      minPoints: 5,
      maxPoints: 10,
      isDefault: true,
    },

    // Character
    {
      name: "Showed kindness to another member",
      description: "Youth demonstrated care and consideration for someone else",
      minPoints: 3,
      maxPoints: 10,
      isDefault: true,
    },
    {
      name: "Resolved a conflict peacefully",
      description: "Youth handled a disagreement calmly and respectfully",
      minPoints: 5,
      maxPoints: 10,
      isDefault: true,
    },
    {
      name: "Took responsibility for a mistake",
      description: "Youth owned up to something they did wrong",
      minPoints: 5,
      maxPoints: 10,
      isDefault: true,
    },
    {
      name: "Encouraged someone who was struggling",
      description: "Youth lifted up a peer who needed support",
      minPoints: 3,
      maxPoints: 8,
      isDefault: true,
    },
    {
      name: "Welcomed a new member",
      description: "Youth made a new person feel included and comfortable",
      minPoints: 3,
      maxPoints: 8,
      isDefault: true,
    },

    // Leadership
    {
      name: "Helped staff without being asked",
      description: "Youth voluntarily assisted a staff member",
      minPoints: 5,
      maxPoints: 10,
      isDefault: true,
    },
    {
      name: "Mentored a younger member",
      description: "Youth guided or supported a younger peer",
      minPoints: 5,
      maxPoints: 15,
      isDefault: true,
    },
    {
      name: "Led a group activity",
      description: "Youth took initiative and led others in an activity",
      minPoints: 5,
      maxPoints: 15,
      isDefault: true,
    },

    // Community & Citizenship
    {
      name: "Cleaned up without being asked",
      description: "Youth voluntarily tidied up their space or the facility",
      minPoints: 3,
      maxPoints: 8,
      isDefault: true,
    },
    {
      name: "Picked up trash",
      description: "Youth helped keep the space clean by picking up litter",
      minPoints: 3,
      maxPoints: 5,
      isDefault: true,
    },
    {
      name: "Held the door for someone",
      description: "Youth showed courtesy and consideration",
      minPoints: 1,
      maxPoints: 3,
      isDefault: true,
    },
  ];

  const prizes = [
    // Small / Instant
    {
      name: "Wooden pencil",
      pointCost: 15,
      quantity: 999,
      requiresAdmin: false,
    },
    { name: "Eraser", pointCost: 15, quantity: 999, requiresAdmin: false },
    { name: "Stickers", pointCost: 15, quantity: 999, requiresAdmin: false },
    { name: "Glue", pointCost: 15, quantity: 999, requiresAdmin: false },
    {
      name: "Snack of choice",
      pointCost: 20,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Tier 1 Prize",
      description: "Staff selects from available Tier 1 items",
      pointCost: 20,
      quantity: 999,
      requiresAdmin: false,
    },
    { name: "Can of soda", pointCost: 20, quantity: 999, requiresAdmin: false },
    { name: "Slime", pointCost: 25, quantity: 999, requiresAdmin: false },
    { name: "Yo-yo", pointCost: 25, quantity: 999, requiresAdmin: false },
    { name: "Hacky sack", pointCost: 25, quantity: 999, requiresAdmin: false },
    {
      name: "Jump rope (basic)",
      pointCost: 25,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Silly string",
      pointCost: 25,
      quantity: 999,
      requiresAdmin: false,
    },
    { name: "Origami kit", pointCost: 30, quantity: 999, requiresAdmin: false },
    { name: "Lanyard", pointCost: 30, quantity: 999, requiresAdmin: false },
    {
      name: "Laptop sticker pack",
      pointCost: 30,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Graphite pencils",
      pointCost: 30,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Homework pass (one day)",
      pointCost: 30,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Deck of cards",
      pointCost: 35,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Coloring book",
      pointCost: 35,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Origami paper pack",
      pointCost: 35,
      quantity: 999,
      requiresAdmin: false,
    },
    { name: "Hula hoop", pointCost: 35, quantity: 999, requiresAdmin: false },
    {
      name: "New scissors",
      pointCost: 35,
      quantity: 999,
      requiresAdmin: false,
    },
    { name: "Journal", pointCost: 40, quantity: 999, requiresAdmin: false },
    {
      name: "Comic book / Manga volume",
      pointCost: 40,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Small toy",
      description: "Doll, action figure, or similar small toy",
      pointCost: 40,
      quantity: 999,
      requiresAdmin: false,
    },
    { name: "Frisbee", pointCost: 40, quantity: 999, requiresAdmin: false },
    { name: "Fanny pack", pointCost: 45, quantity: 999, requiresAdmin: false },
    { name: "Sunglasses", pointCost: 45, quantity: 999, requiresAdmin: false },
    {
      name: "Baseball cap",
      pointCost: 50,
      quantity: 999,
      requiresAdmin: false,
    },

    // Privileges / Experiences
    {
      name: "Line leader for a week",
      pointCost: 25,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "First in line for a week",
      pointCost: 25,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Sit anywhere day",
      pointCost: 25,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Extra screen time (30 mins)",
      pointCost: 30,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Pick your seat for a week",
      pointCost: 30,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Choice of class or group game",
      pointCost: 35,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Skip chore rotation (one time)",
      pointCost: 35,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Choose the playlist for the day",
      pointCost: 35,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Front desk helper for one hour",
      pointCost: 40,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Be the DJ for one hour",
      pointCost: 40,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Extra recess or free play time",
      pointCost: 40,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Computer lab free time (30 mins)",
      pointCost: 40,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Name a club activity",
      pointCost: 45,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Lead a group activity",
      pointCost: 45,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Facility pass",
      description:
        "Game room, gym, soccer field, or teen center — youth's choice",
      pointCost: 50,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Open gym session",
      pointCost: 50,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Choose the movie for movie day",
      pointCost: 50,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Get out of homework pass (one day)",
      pointCost: 50,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Be a junior staff helper for a day",
      pointCost: 60,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Pizza party (individual)",
      pointCost: 100,
      quantity: 999,
      requiresAdmin: true,
    },
    {
      name: "Lunch with the director",
      pointCost: 110,
      quantity: 999,
      requiresAdmin: true,
    },
    {
      name: "Early dismissal pass",
      pointCost: 175,
      quantity: 999,
      requiresAdmin: true,
    },
    { name: "Field trip", pointCost: 200, quantity: 999, requiresAdmin: true },

    // Art & School Supplies
    { name: "New markers", pointCost: 50, quantity: 999, requiresAdmin: false },
    {
      name: "Colored pencils",
      pointCost: 50,
      quantity: 999,
      requiresAdmin: false,
    },
    { name: "Maracas", pointCost: 50, quantity: 999, requiresAdmin: false },
    {
      name: "Puzzle (100-500 pieces)",
      pointCost: 50,
      quantity: 999,
      requiresAdmin: false,
    },
    { name: "Kite", pointCost: 50, quantity: 999, requiresAdmin: false },
    { name: "Sketchbook", pointCost: 60, quantity: 999, requiresAdmin: false },
    {
      name: "Novel of choice",
      pointCost: 60,
      quantity: 999,
      requiresAdmin: false,
    },
    { name: "Paint set", pointCost: 75, quantity: 999, requiresAdmin: false },
    { name: "Clay kit", pointCost: 75, quantity: 999, requiresAdmin: false },
    {
      name: "Craft supply kit",
      description: "Assorted craft supplies",
      pointCost: 75,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Watercolor set",
      pointCost: 75,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Calligraphy set",
      pointCost: 100,
      quantity: 999,
      requiresAdmin: false,
    },
    { name: "Board game", pointCost: 125, quantity: 999, requiresAdmin: false },
    {
      name: "Lego set (small)",
      pointCost: 125,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "D&D starter kit",
      pointCost: 150,
      quantity: 999,
      requiresAdmin: false,
    },
    { name: "Ukulele", pointCost: 200, quantity: 999, requiresAdmin: true },

    // Clothing & Accessories
    {
      name: "Water bottle",
      pointCost: 60,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Club apparel",
      description: "T-shirt, shorts, or other club clothing",
      pointCost: 75,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Drawstring backpack",
      pointCost: 75,
      quantity: 999,
      requiresAdmin: false,
    },
    { name: "Hoodie", pointCost: 150, quantity: 999, requiresAdmin: false },
    {
      name: "Nice backpack",
      pointCost: 200,
      quantity: 999,
      requiresAdmin: true,
    },
    { name: "New shoes", pointCost: 250, quantity: 999, requiresAdmin: true },

    // Toys & Games
    {
      name: "Mini chess board",
      pointCost: 60,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Deck of Pokemon cards",
      pointCost: 75,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Model kit",
      description: "Car, airplane, or similar model",
      pointCost: 75,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Jump rope (speed)",
      pointCost: 75,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Nice chess board",
      pointCost: 150,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Remote control car",
      pointCost: 200,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Lego set (large)",
      pointCost: 300,
      quantity: 999,
      requiresAdmin: true,
    },

    // Sports & Outdoors
    {
      name: "Badminton set",
      pointCost: 75,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Resistance bands set",
      pointCost: 75,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Sports ball of choice",
      description: "Football, soccer ball, basketball, or volleyball",
      pointCost: 125,
      quantity: 999,
      requiresAdmin: false,
    },
    { name: "Skateboard", pointCost: 250, quantity: 999, requiresAdmin: true },
    {
      name: "Mountain bike",
      pointCost: 1000,
      quantity: 1,
      requiresAdmin: true,
    },

    // Tech
    {
      name: "Tech accessory",
      description: "USB drive, adapter, charger, or mouse pad",
      pointCost: 75,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Bluetooth receiver",
      pointCost: 100,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Gaming mouse",
      pointCost: 150,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Bluetooth speaker",
      pointCost: 250,
      quantity: 999,
      requiresAdmin: true,
    },
    {
      name: "First Act guitar",
      pointCost: 250,
      quantity: 999,
      requiresAdmin: true,
    },
    {
      name: "Arduino starter kit",
      pointCost: 350,
      quantity: 999,
      requiresAdmin: true,
    },
    {
      name: "Xbox controller",
      pointCost: 350,
      quantity: 999,
      requiresAdmin: true,
    },
    {
      name: "Electronic drum pad",
      pointCost: 350,
      quantity: 999,
      requiresAdmin: true,
    },
    {
      name: "PS5 controller",
      pointCost: 400,
      quantity: 999,
      requiresAdmin: true,
    },
    {
      name: "Raspberry Pi kit",
      pointCost: 400,
      quantity: 999,
      requiresAdmin: true,
    },
    {
      name: "Airpods / earbuds",
      pointCost: 500,
      quantity: 999,
      requiresAdmin: true,
    },
    {
      name: "Record player",
      pointCost: 500,
      quantity: 999,
      requiresAdmin: true,
    },
    {
      name: "Electric guitar (full size)",
      pointCost: 600,
      quantity: 1,
      requiresAdmin: true,
    },

    // Big Ticket
    {
      name: "Gift card ($10)",
      pointCost: 100,
      quantity: 999,
      requiresAdmin: true,
    },
    {
      name: "Gift card ($25)",
      pointCost: 225,
      quantity: 999,
      requiresAdmin: true,
    },
    {
      name: "Gift card ($50)",
      pointCost: 400,
      quantity: 999,
      requiresAdmin: true,
    },
    {
      name: "Tier 2 Prize",
      description: "Staff selects from available Tier 2 items",
      pointCost: 75,
      quantity: 999,
      requiresAdmin: false,
    },
    {
      name: "Tier 3 Prize",
      description: "Staff selects from available Tier 3 items",
      pointCost: 250,
      quantity: 999,
      requiresAdmin: true,
    },
    {
      name: "Tier 4 Prize",
      description: "Staff selects from available Tier 4 items",
      pointCost: 700,
      quantity: 999,
      requiresAdmin: true,
    },
    {
      name: "Nintendo Switch game",
      pointCost: 300,
      quantity: 999,
      requiresAdmin: true,
    },
    { name: "Tablet", pointCost: 700, quantity: 999, requiresAdmin: true },
    {
      name: "Nintendo Switch",
      pointCost: 800,
      quantity: 1,
      requiresAdmin: true,
    },
    { name: "PS5", pointCost: 1500, quantity: 1, requiresAdmin: true },
    {
      name: "Xbox Series X",
      pointCost: 1500,
      quantity: 1,
      requiresAdmin: true,
    },
  ];

  await prisma.behavior.createMany({
    data: behaviors.map((b) => ({ ...b, organizationId })),
  });

  await prisma.prize.createMany({
    data: prizes.map((p) => ({ ...p, organizationId })),
  });
}
