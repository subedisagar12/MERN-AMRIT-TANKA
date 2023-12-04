const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  try {
    let bearer_token = req.headers.authorization;
    if (!bearer_token) {
      return res.status(401).json({
        message: "UnAuthorized",
      });
    }

    let token = bearer_token.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function (error, decodedData) {
      if (error) {
        return res.status(401).json({
          message: "Invalid token",
        });
      } else {
        req.user = decodedData;
        next();
      }
    });
  } catch (e) {
    return res.status(401).json({ message: e.message });
  }
}

module.exports = authMiddleware;
