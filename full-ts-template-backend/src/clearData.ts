import { PrismaClient, User, Post } from "@prisma/client";
const prisma = new PrismaClient();

function clear() {
  prisma.follows.deleteMany();
  prisma.post.deleteMany();
  prisma.user.deleteMany();
  console.log("Deleted!");
}
clear();
