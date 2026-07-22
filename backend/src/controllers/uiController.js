const { models } = require('../models');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

async function getBanners(req, res) {
  try {
    const banners = {
      hero: `${BASE_URL}/uploads/system/hero.png`,
      loginBanner: `${BASE_URL}/uploads/system/login-banner.png`,
      signUpBanner: `${BASE_URL}/uploads/system/register-banner.png`,
    };
    return res.status(200).json(banners);
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Failed to fetch banners',
    });
  }
}


async function getQuangCao(req, res) {
  try {
    const ads = await models.QuangCao.findAll({
      where: { kich_hoat: true },
      order: [['uu_tien', 'DESC']],
    });

    // Map to return full image URLs
    const result = ads.map((ad) => ({
      id: ad.id,
      tieu_de: ad.tieu_de,
      url_hinh_anh: ad.url_hinh_anh.startsWith('http')
        ? ad.url_hinh_anh
        : `${BASE_URL}${ad.url_hinh_anh}`,
      url_dich: ad.url_dich || null,
      mua: ad.mua || null,
      danh_muc_trong_tam: ad.danh_muc_trong_tam || null,
      uu_tien: ad.uu_tien,
      ngay_bat_dau: ad.ngay_bat_dau || null,
      ngay_ket_thuc: ad.ngay_ket_thuc || null,
      kich_hoat: ad.kich_hoat,
    }));

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Không thể lấy danh sách quảng cáo',
    });
  }
}

module.exports = { getBanners, getQuangCao };

