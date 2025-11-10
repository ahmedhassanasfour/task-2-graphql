const jwt = require("jsonwebtoken");
const SECRETKEY = "secretkey";

function generateToken(user) {
  return jwt.sign({ sub: user.id, email: user.email }, SECRETKEY, {
    expiresIn: "7h",
  });
}

function getUserFromToken(token) {
  try {
    if (!token) return null;
    const decoded = jwt.verify(token.replace("Bearer ", ""), SECRETKEY);
    return decoded;
  } catch {
    return null;
  }
}

module.exports = { generateToken, getUserFromToken };
