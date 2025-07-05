import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ msg: "Unauthorized" });
    return;
  }

  try {
   const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.decoded = { userId: decoded.userId }; 
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
    return;
  }
};
