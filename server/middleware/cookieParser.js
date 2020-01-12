const parseCookies = (req, res, next) => {
  if (req.headers.cookie) {
    const cookies = req.headers.cookie;
    const parsed = {};
    let prop;
    for (let cookie of cookies.split(";")) {
      prop = cookie.split("=");
      parsed[prop[0].trim(" ")] = prop[1];
    }
    req["cookies"] = parsed;
  } else {
    req.cookies = {};
  }
  next();
};

module.exports = parseCookies;
