import { NextFunction, Request, Response } from "express";
import getUserData from "../../utils/getUserData";

function checkForUserDataProps(user: any) {
  if (!user.email || !user.id || !user.name) {
    return null;
  }
  return { email: user.email, id: user.id, name: user.name };
}

/* export async function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  const userData=await getUserData(redisClient);
  

  if (await )
  res.send("Not logged in");
} */

export function isNotLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (!req.userData) {
    return next();
  }
  res.send("Already logged in");
}
