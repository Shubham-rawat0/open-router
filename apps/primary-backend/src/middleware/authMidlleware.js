import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
export const authMiddleware = (req, res, next) => {
    const token = req.cookies?.auth;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded.userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.userId = decoded.userId;
        next();
    }
    catch {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
