const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { models } = require('../models');

// Multer storage
const uploadDir = path.join(__dirname, '..', '..', 'uploads', 'system');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, `${Date.now()}_${safe}`);
  },
});

const upload = multer({ storage });

function listModels(req, res) {
  return res.json({ models: Object.keys(models) });
}

async function listRecords(req, res) {
  try {
    const name = req.params.model;
    const Model = models[name];
    if (!Model) return res.status(404).json({ message: 'Model not found' });

    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '25', 10);
    const offset = (page - 1) * limit;

    const result = await Model.findAndCountAll({ limit, offset });
    return res.json({ count: result.count, rows: result.rows });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function getRecord(req, res) {
  try {
    const name = req.params.model;
    const id = req.params.id;
    const Model = models[name];
    if (!Model) return res.status(404).json({ message: 'Model not found' });

    const pk = Model.primaryKeyAttributes && Model.primaryKeyAttributes[0];
    const where = {};
    where[pk] = id;

    const record = await Model.findOne({ where });
    if (!record) return res.status(404).json({ message: 'Not found' });
    return res.json(record);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function createRecord(req, res) {
  try {
    const name = req.params.model;
    const Model = models[name];
    if (!Model) return res.status(404).json({ message: 'Model not found' });

    const payload = { ...(req.body || {}) };

    // If a file was uploaded, try to attach it to a likely image field
    if (req.file) {
      const url = `${req.protocol}://${req.get('host')}/uploads/system/${req.file.filename}`;
      // heuristics: prefer known image fields
      const imageFields = ['anh_san_pham', 'url_hinh_anh', 'anh', 'image', 'avatar'];
      for (const f of imageFields) {
        if (Object.prototype.hasOwnProperty.call(Model.rawAttributes, f)) {
          payload[f] = url;
          break;
        }
      }
      // fallback: set 'anh_san_pham' if exists, otherwise first string attribute
      if (!Object.values(payload).includes(url)) {
        if (Model.rawAttributes.anh_san_pham) payload.anh_san_pham = url;
        else {
          const firstString = Object.keys(Model.rawAttributes).find(k => Model.rawAttributes[k].type && Model.rawAttributes[k].type.key === 'STRING');
          if (firstString) payload[firstString] = url;
        }
      }
    }

    const created = await Model.create(payload);
    return res.status(201).json(created);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function updateRecord(req, res) {
  try {
    const name = req.params.model;
    const id = req.params.id;
    const Model = models[name];
    if (!Model) return res.status(404).json({ message: 'Model not found' });

    const pk = Model.primaryKeyAttributes && Model.primaryKeyAttributes[0];
    const where = {};
    where[pk] = id;

    const payload = { ...(req.body || {}) };
    if (req.file) {
      const url = `${req.protocol}://${req.get('host')}/uploads/system/${req.file.filename}`;
      if (Model.rawAttributes.anh_san_pham) payload.anh_san_pham = url;
      else {
        const firstString = Object.keys(Model.rawAttributes).find(k => Model.rawAttributes[k].type && Model.rawAttributes[k].type.key === 'STRING');
        if (firstString) payload[firstString] = url;
      }
    }

    const [updated] = await Model.update(payload, { where });
    if (!updated) return res.status(404).json({ message: 'Not found or no change' });

    const record = await Model.findOne({ where });
    return res.json(record);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function deleteRecord(req, res) {
  try {
    const name = req.params.model;
    const id = req.params.id;
    const Model = models[name];
    if (!Model) return res.status(404).json({ message: 'Model not found' });

    const pk = Model.primaryKeyAttributes && Model.primaryKeyAttributes[0];
    const where = {};
    where[pk] = id;

    const deleted = await Model.destroy({ where });
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function analytics(req, res) {
  try {
    const counts = {};
    for (const key of Object.keys(models)) {
      try {
        counts[key] = await models[key].count();
      } catch (e) {
        counts[key] = null;
      }
    }

    // basic sales/revenue summary if DonHang + ThanhToan exist
    let revenue = null;
    if (models.ThanhToan) {
      const rows = await models.ThanhToan.findAll({ attributes: ['so_tien'] });
      revenue = rows.reduce((s, r) => s + (parseFloat(r.so_tien) || 0), 0);
    }

    return res.json({ counts, revenue });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = {
  upload,
  listModels,
  listRecords,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecord,
  analytics,
};
