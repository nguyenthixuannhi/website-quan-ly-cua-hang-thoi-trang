function adminMiddleware(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const role = (req.user.vai_tro || '').toString().toUpperCase();
  if (role !== 'ADMIN') {
    return res.status(403).json({ message: 'Forbidden: admin only' });
  }

  return next();
}

module.exports = adminMiddleware;
