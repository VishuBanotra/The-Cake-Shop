import ErrorHandler from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";


export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    jwt.verify(authHeader, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(404).json({ message: "Not found" });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(403).json({ message: "User not logged in." });
  }
};

export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new ErrorHandler("Only Admin Allowed", 405));
  }
  next();
};
