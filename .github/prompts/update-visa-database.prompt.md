---
name: update-visa-database
description: Update visa requirements
tools: [neon/*, oraios/serena/*]
---

Update the visa requirements in the database. The visa requirements include the country of origin, the destination country, the type of visa, and any specific requirements or restrictions. Make sure to verify the information from reliable sources before updating the database.

Travel visa Requirements: https://raw.githubusercontent.com/ilyankou/passport-index-dataset/refs/heads/master/passport-index-tidy.csv

Pull the information from the provided CSV file and update the visa requirements in the database accordingly. Ensure that the data is accurate and up-to-date, and handle any discrepancies or missing information appropriately.

Use neon mcp to CRUD the database entries for visa requirements. This may involve creating new entries for countries that are not currently in the database, updating existing entries with new information, and deleting any outdated or incorrect entries. Make sure to maintain data integrity and consistency throughout the process.

After updating the database, provide a summary of the changes made, including the number of entries added, updated, and deleted. Additionally, highlight any significant changes in visa requirements that may affect travelers.

Provide a list of abandoned destinations or passports that have missing information in the database, and don't ever fill in missing information without verifying it from reliable sources. Always ensure that the data in the database is accurate and up-to-date to provide travelers with the most reliable information regarding visa requirements.
