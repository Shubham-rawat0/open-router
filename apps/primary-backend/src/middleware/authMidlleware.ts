import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authMiddleware = (req: any, res: any, next: any) => {
  const token = req.cookies?.auth;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    if (!decoded.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.userId = decoded.userId;
    next();
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
