import { NextFunction, Request, Response } from "express";

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.user) {
    return next();
  }
  res.send("Not logged in");
}

export function isNotLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return next();
  }
  res.send("Already logged in");
}
