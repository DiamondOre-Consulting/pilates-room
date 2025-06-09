import jwt from "jsonwebtoken";

export const validateUserRefreshToken = (req, res, next) => {
  try {
    const { refreshToken } = req.cookies; 
    if (!refreshToken) return res.status(401).json({ error: "No refresh token" });

    const decoded = jwt.verify(refreshToken, process.env.USER_REFRESH_SECRET_KEY);
    req.user = decoded; 
    next(); 
  } catch (err) {
    return res.status(403).json({ error: "Invalid/Expired refresh token" });
  }
};