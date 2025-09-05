/**
 * Setup script to create local SQLite database with schema
 */
import { createClient } from "@libsql/client";

async function setupLocalDatabase() {
  console.log("🔧 Setting up local SQLite database...");

  try {
    // Create LibSQL client for local SQLite file
    const dbPath = `${process.cwd()}/local-db.sqlite`;
    const client = createClient({
      url: `file:${dbPath}`,
    });

    console.log(`📁 Database path: ${dbPath}`);

    // Create tables using the schema
    console.log("📋 Creating database tables...");

    // Create tables manually since we don't have migrations
    await client.execute(`
      CREATE TABLE IF NOT EXISTS countries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT(3) NOT NULL UNIQUE,
        continent TEXT NOT NULL,
        region TEXT,
        is_active INTEGER DEFAULT 1 NOT NULL,
        created_at INTEGER DEFAULT (unixepoch()) NOT NULL,
        updated_at INTEGER DEFAULT (unixepoch()) NOT NULL,
        deleted_at INTEGER
      )
    `);

    await client.execute(`
      CREATE TABLE IF NOT EXISTS countries_i18n (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        country_id INTEGER NOT NULL,
        locale TEXT(5) NOT NULL,
        name TEXT NOT NULL,
        description TEXT,
        created_at INTEGER DEFAULT (unixepoch()) NOT NULL,
        updated_at INTEGER DEFAULT (unixepoch()) NOT NULL,
        UNIQUE(country_id, locale),
        FOREIGN KEY (country_id) REFERENCES countries (id)
      )
    `);

    await client.execute(`
      CREATE TABLE IF NOT EXISTS visa_types (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        destination_id INTEGER NOT NULL,
        type TEXT NOT NULL,
        duration INTEGER,
        processing_time INTEGER,
        fee REAL,
        currency TEXT(3),
        requires_interview INTEGER DEFAULT 0,
        is_multi_entry INTEGER DEFAULT 0,
        requirements TEXT,
        documents TEXT,
        is_active INTEGER DEFAULT 1 NOT NULL,
        created_at INTEGER DEFAULT (unixepoch()) NOT NULL,
        updated_at INTEGER DEFAULT (unixepoch()) NOT NULL,
        deleted_at INTEGER,
        FOREIGN KEY (destination_id) REFERENCES countries (id)
      )
    `);

    await client.execute(`
      CREATE TABLE IF NOT EXISTS visa_types_i18n (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        visa_type_id INTEGER NOT NULL,
        locale TEXT(5) NOT NULL,
        name TEXT NOT NULL,
        description TEXT,
        created_at INTEGER DEFAULT (unixepoch()) NOT NULL,
        updated_at INTEGER DEFAULT (unixepoch()) NOT NULL,
        UNIQUE(visa_type_id, locale),
        FOREIGN KEY (visa_type_id) REFERENCES visa_types (id)
      )
    `);

    await client.execute(`
      CREATE TABLE IF NOT EXISTS visa_eligibility (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        destination_id INTEGER NOT NULL,
        passport_id INTEGER NOT NULL,
        visa_type_id INTEGER NOT NULL,
        eligibility_status TEXT NOT NULL,
        max_stay_days INTEGER,
        is_active INTEGER DEFAULT 1 NOT NULL,
        created_at INTEGER DEFAULT (unixepoch()) NOT NULL,
        updated_at INTEGER DEFAULT (unixepoch()) NOT NULL,
        deleted_at INTEGER,
        FOREIGN KEY (destination_id) REFERENCES countries (id),
        FOREIGN KEY (passport_id) REFERENCES countries (id),
        FOREIGN KEY (visa_type_id) REFERENCES visa_types (id)
      )
    `);

    await client.execute(`
      CREATE TABLE IF NOT EXISTS visa_eligibility_i18n (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        visa_eligibility_id INTEGER NOT NULL,
        locale TEXT(5) NOT NULL,
        notes TEXT,
        created_at INTEGER DEFAULT (unixepoch()) NOT NULL,
        updated_at INTEGER DEFAULT (unixepoch()) NOT NULL,
        UNIQUE(visa_eligibility_id, locale),
        FOREIGN KEY (visa_eligibility_id) REFERENCES visa_eligibility (id)
      )
    `);

    console.log("✅ Database tables created successfully!");
    console.log("🎉 Local database setup completed!");
  } catch (error) {
    console.error("❌ Error setting up local database:", error);
    throw error;
  }
}

// Run the setup function
setupLocalDatabase()
  .then(() => {
    console.log("✨ Database setup process finished");
    process.exit(0);
  })
  .catch(error => {
    console.error("💥 Database setup failed:", error);
    process.exit(1);
  });
