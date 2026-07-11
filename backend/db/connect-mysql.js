const { sequelize } = require('./connection');

async function main() {
  try {
    await sequelize.authenticate();
    console.log('[DB] Connection successful');
    process.exit(0);
  } catch (err) {
    console.error('[DB] Connection failed:', err.message);
    process.exit(1);
  }
}

main();

