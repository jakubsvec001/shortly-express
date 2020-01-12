const models = require("../models");
const Promise = require("bluebird");

module.exports.createSession = (req, res, next) => {
  // console.log("REQ", req.headers);
  // HAVE COOKIE?
  if (Object.keys(req.cookies).length !== 0) {
    const shortlyid = req.cookies["shortlyid"];
    // DON'T HAVE OUR COOKIE SESSION?
    if (!shortlyid) {
      const [createPromise, hash] = models.Sessions.create();
      createPromise
        .then(() => {
          req.session = {};
          req.session.hash = hash;
          res.cookies = {};
          res.cookies.shortlyid = {};
          res.cookies.shortlyid.value = hash;
          // console.log("CREATED HASH IN createSession: ", hash);
          // console.log("req.session", req.session);
          // console.log("req.cookies", req.cookies);
          // console.log("HASH on req.session", req.session.hash);
          // console.log("res.cookies.shortlyid", res.cookies.shortlyid);
        })
        .catch(err => {
          console.log("ERROR", err);
        })
        .then(() => next());
      // HAVE A SHORTLYID SESSION COOKIE:
    } else {
      models.Sessions.get({ hash: shortlyid })
        .then(sessionObject => {
          req.session = {};
          req.session.hash = sessionObject.hash;
          if (sessionObject.userId === null) {
          } else {
            req.session = sessionObject;
          }
          next();
        })
        .catch(err => {
          console.log("NICE TRY HACKER!!!!!");
          req.session = {};
          const [createPromise, hash] = models.Sessions.create();
          createPromise
            .then(() => {
              req.session.hash = hash;
              next();
            })
            .catch(() => {
              console.log("ERROR");
              next();
            });
        });
    }
    // } else {
    //   console.log("SHORTLY ID PRESENT: ", shortlyid);
    //   next();
    //   // check the db for the session id, get user name and user id and add props to session
    // }

    //add to session db using newly created hash
    //add
  } else {
    const [createPromise, hash] = models.Sessions.create();
    createPromise
      .then(() => {
        req.session = {};
        req.session.hash = hash;
        res.cookies = {};
        res.cookies.shortlyid = {};
        res.cookies.shortlyid.value = hash;
        // set res.cookies to CONCAT TO to the string `; shortlyid=${hash}`
        //
        console.log("CREATED HASH IN createSession: ", hash);

        console.log("req.session", req.session);
        console.log("req.cookies", req.cookies);
        console.log("HASH on req.session", req.session.hash);
        console.log("res.cookies.shortlyid", res.cookies.shortlyid);
      })
      .catch(err => {
        console.log("ERROR", err);
      })
      .then(() => next());
  }

  /************************************************************/
  // Add additional authentication middleware functions below
  /************************************************************/
};
