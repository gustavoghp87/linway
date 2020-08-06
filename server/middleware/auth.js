const { User } = require('../models/User');


let auth = (req, res, next) => {

  // res.cookie("facebook", "false")
  //   .cookie("fbAccessToken", "")
  //   .cookie("google", "false")
  //   .cookie("glAccessToken", "")
  //   .cookie("w_auth", "")
  console.log("Ingreso en auth.js ........................ ")

  if (req.cookies.facebook=="true") {
    console.log("Ingreso en auth.js 1,", req.cookies.fbAccessToken)
    
    try {
      let fbAccessTokenCookie = req.cookies.fbAccessToken;

      User.findOne({facebookID:req.cookies.facebookID}, (err, user) => {
        if (err) throw err;
        if (!user)
          return res.json({isAuth: false, error: true});
    
        if (user.fbAccessToken === fbAccessTokenCookie) {
          req.fbAccessToken = fbAccessTokenCookie;
          req.user = user;
    
          next();
        } else {
          return res
            .cookie("facebook", "false")
            .cookie("fbAccessToken", "")
            .cookie("facebookID", "")
            .json({isAuth: false, error: true});
        };
      });
    } catch(e) {
      console.log("Error en auth fb,", e)
      return res
        .cookie("facebook", "false")
        .cookie("fbAccessToken", "")
        .cookie("facebookID", "")
        .json({isAuth: false, error: true});
    };
  };

    
  if (req.cookies.google=="true") {
    console.log("Ingreso en auth.js 2,", req.cookies.glAccessToken)

    try {
      let glAccessTokenCookie = req.cookies.glAccessToken;

      User.findOne({googleID:req.cookies.googleID}, (err, user) => {
        if (err) throw err;
        if (!user)
          return res.json({isAuth: false, error: true});
    
        if (user.glAccessToken === glAccessTokenCookie) {
          req.glAccessToken = glAccessTokenCookie;
          req.user = user;
    
          next();
        } else {
          return res
            .cookie("google", "false")
            .cookie("glAccessToken", "")
            .cookie("googleID", "")
            .json({isAuth: false, error: true});
        };
      });
    } catch(e) {
      console.log("Error en auth gl,", e)
      return res
      .cookie("google", "false")
      .cookie("glAccessToken", "")
      .cookie("googleID", "")
      .json({isAuth: false, error: true});
    };
    
  };


  if (req.cookies.google!="true" && req.cookies.facebook!="true") {
    console.log("Ingreso en auth.js 3,", req.cookies.w_auth)
    let token = req.cookies.w_auth;
    User.findByToken(token, (err, user) => {
      if (err) throw err;
      if (!user) {
        return res
          .cookie("w_auth", "")
          .json({isAuth: false, error: true});
      }
 
      req.token = token;
      req.user = user;
  
      next();
    });
  }
};


module.exports = { auth };
