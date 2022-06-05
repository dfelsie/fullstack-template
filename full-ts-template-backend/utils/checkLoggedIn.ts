import Redis from "ioredis";
import getUserData from "./getUserData";

export default async function checkLoggedIn(redisClient: Redis) {
  if(await getUserData(redisClient)){
    return true
  }
  return false;
}
