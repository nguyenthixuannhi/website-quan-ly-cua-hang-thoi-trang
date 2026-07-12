const { sequelize } = require('./connection');

async function main() {
  try {
    await sequelize.authenticate();
    console.log('[DB] Connection suck');
    process.exit(0);
  } catch (err) {
    console.error('[DB] Connection not suck, in fact it doesn\'t even exist:', err.message);
    process.exit(1);
  }
}

main();

