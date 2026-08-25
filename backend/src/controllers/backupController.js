const { createDatabaseBackup } = require('../utils/dbBackup');

const ADMIN_ALLOWED_ROLES = new Set(['ADMIN', 'STAFF']);

async function createBackup(req, res) {
  try {
    const userRole = String(req.user?.vai_tro || '').toUpperCase();

    if (!ADMIN_ALLOWED_ROLES.has(userRole)) {
      return res.status(403).json({
        message: 'Forbidden: backup creation is restricted to ADMIN and STAFF users',
      });
    }

    const result = createDatabaseBackup({
      host: process.env.DB_HOST || 'mysql',
      port: process.env.DB_PORT || '3306',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'store',
      outputDir: process.env.BACKUP_DIR || require('node:path').resolve(__dirname, '../../backups'),
    });

    return res.status(201).json({
      message: 'Database backup created successfully',
      backup: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to create database backup',
      error: error.message,
    });
  }
}

module.exports = {
  createBackup,
};
