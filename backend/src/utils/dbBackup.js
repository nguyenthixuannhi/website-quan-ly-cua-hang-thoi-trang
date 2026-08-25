const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

function ensureBackupDirectory(backupDir) {
  const dir = backupDir || path.resolve(__dirname, '../../backups');

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    return true;
  }

  return false;
}

function buildBackupFilePath(baseDir, databaseName, timestamp = new Date()) {
  const safeDbName = String(databaseName || 'database')
    .trim()
    .replace(/[^a-zA-Z0-9_-]+/g, '_')
    .replace(/^_+|_+$/g, '') || 'database';

  const pad = (value) => String(value).padStart(2, '0');
  const formattedDate = [
    timestamp.getFullYear(),
    pad(timestamp.getMonth() + 1),
    pad(timestamp.getDate()),
  ].join('');
  const formattedTime = [
    pad(timestamp.getHours()),
    pad(timestamp.getMinutes()),
    pad(timestamp.getSeconds()),
  ].join('');

  const outputDir = path.resolve(baseDir || path.resolve(__dirname, '../../backups'));
  return path.join(outputDir, `${safeDbName}_${formattedDate}_${formattedTime}.sql`);
}

function createDatabaseBackup(options = {}) {
  const host = options.host || process.env.DB_HOST || 'mysql';
  const port = options.port || process.env.DB_PORT || '3306';
  const user = options.user || process.env.DB_USER || 'root';
  const password = options.password ?? process.env.DB_PASSWORD ?? '';
  const database = options.database || process.env.DB_NAME || 'store';
  const backupDir = options.outputDir || process.env.BACKUP_DIR || path.resolve(__dirname, '../../backups');
  const filePath = options.filePath || buildBackupFilePath(backupDir, database);

  ensureBackupDirectory(backupDir);

  const env = {
    ...process.env,
    MYSQL_PWD: password,
  };

  const result = spawnSync(
    'mysqldump',
    [
      `--host=${host}`,
      `--port=${port}`,
      `--user=${user}`,
      '--default-character-set=utf8mb4',
      '--single-transaction',
      '--routines',
      '--events',
      '--triggers',
      `${database}`,
      '--result-file',
      filePath,
    ],
    {
      env,
      stdio: ['ignore', 'pipe', 'pipe'],
    },
  );

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    const errorOutput = (result.stderr || Buffer.from('')).toString().trim() || (result.stdout || Buffer.from('')).toString().trim();
    throw new Error(errorOutput || 'Database backup failed');
  }

  const stats = fs.existsSync(filePath) ? fs.statSync(filePath) : null;

  return {
    filePath,
    fileName: path.basename(filePath),
    size: stats ? stats.size : 0,
    createdAt: new Date().toISOString(),
    database,
    absolutePath: filePath,
  };
}

module.exports = {
  ensureBackupDirectory,
  buildBackupFilePath,
  createDatabaseBackup,
};
