const { verifyToken } = require('../config/jwt');

function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({ message: 'Unauthorized: missing Bearer token' });
    }

    const decoded = verifyToken(token);

    req.user = {
      id_nguoi_dung: decoded.id_nguoi_dung,
      email: decoded.email,
      vai_tro: decoded.vai_tro,
    };


    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: invalid or expired token' });
  }
}

module.exports = authMiddleware;


