function cacheControl(seconds = 0) {
  const value = seconds > 0 ? `public, max-age=${seconds}` : 'no-store';
  return (req, res, next) => {
    res.set('Cache-Control', value);
    next();
  };
}

module.exports = cacheControl;
