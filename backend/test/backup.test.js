const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { buildBackupFilePath, ensureBackupDirectory } = require('../src/utils/dbBackup');

test('buildBackupFilePath creates a timestamped .sql file in the backup directory', () => {
  const baseDir = path.join(os.tmpdir(), `backup-test-${Date.now()}`);
  const filePath = buildBackupFilePath(baseDir, 'store');

  assert.match(filePath, /store_\d{8}_\d{6}\.sql$/);
  assert.equal(path.dirname(filePath), baseDir);
});

test('ensureBackupDirectory creates the directory when it does not exist', () => {
  const baseDir = path.join(os.tmpdir(), `backup-dir-${Date.now()}`);

  assert.equal(fs.existsSync(baseDir), false);
  const created = ensureBackupDirectory(baseDir);

  assert.equal(created, true);
  assert.equal(fs.existsSync(baseDir), true);
  fs.rmSync(baseDir, { recursive: true, force: true });
});
