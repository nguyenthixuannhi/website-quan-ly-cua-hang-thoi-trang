const { models } = require('../models');

// GET /danhmuc
async function getDanhMucAll(req, res) {
  try {
    const danhMucs = await models.DanhMuc.getDanhMucAll();
    return res.status(200).json(danhMucs);
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Failed to fetch danh muc list',
    });
  }
}

module.exports = { getDanhMucAll };

