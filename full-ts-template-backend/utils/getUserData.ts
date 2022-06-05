import Redis from "ioredis";
import { userData } from "../types/userData";

export default async function getUserData(
  redisClient: Redis
): Promise<userData | null> {
  const userData = await redisClient.get("userData");
  console.log(userData, "userData");
  if (userData) {
    return JSON.parse(userData);
  }
  return null;
}
