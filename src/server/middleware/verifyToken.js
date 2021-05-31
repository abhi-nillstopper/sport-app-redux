import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const bearerToken = req.header("user");
  if (typeof bearerToken !== "undefined") {
    req.token = bearerToken;
    verifyAndCallController(req, res, next);
  } else {
    console.log("JWT-user not present in Header");
    return res.sendStatus(401);
  }
}

function verifyAndCallController(req, res, callback) {
  jwt.verify(req.token, process.env.SESSION_SECRET, (err, authData) => {
    if (err) {
      console.log("JWT error", err);
      return res.sendStatus(401);
    } else {
      res.locals.authData = authData;
      callback();
    }
  });
}
