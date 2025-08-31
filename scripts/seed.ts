#!/usr/bin/env tsx

import { seedDatabase } from "../src/lib/db/seed";

async function main() {
  try {
    console.log("Starting database seeding...");
    await seedDatabase();
    console.log("✅ Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Database seeding failed:", error);
    process.exit(1);
  }
}

main();
