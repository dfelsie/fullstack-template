import { Express } from "express";

declare global {
  namespace Express {
    interface Request {
      userData: { id: number; email: string; name: string } | null;
    }
  }
}
