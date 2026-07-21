const { models } = require('../models');

// GET /danhmuc
async function getAll(req, res) {
  try {
    const danhMucs = await models.DanhMuc.findAll();
    return res.status(200).json(danhMucs);
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Failed to fetch danh muc list',
    });
  }
}

module.exports = { getAll };

