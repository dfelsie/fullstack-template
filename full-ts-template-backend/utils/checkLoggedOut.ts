import Redis from "ioredis";
import getUserData from "./getUserData";

export default async function checkLoggedOut(redisClient: Redis) {
  if (await getUserData(redisClient)) {
    return false;
  }
  return true;
}
