const parseCookies = (req, res, next) => {
  const cookie = req.headers.cookie;
  console.log(cookie);
  next();
};

module.exports = parseCookies;
