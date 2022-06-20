/*
  Warnings:

  - You are about to drop the `FollowersOfUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_friends` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FollowersOfUser" DROP CONSTRAINT "FollowersOfUser_userName_fkey";

-- DropForeignKey
ALTER TABLE "_friends" DROP CONSTRAINT "_friends_A_fkey";

-- DropForeignKey
ALTER TABLE "_friends" DROP CONSTRAINT "_friends_B_fkey";

-- DropTable
DROP TABLE "FollowersOfUser";

-- DropTable
DROP TABLE "_friends";

-- CreateTable
CREATE TABLE "Follows" (
    "followerId" INTEGER NOT NULL,
    "followingId" INTEGER NOT NULL,
    "followedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Follows_pkey" PRIMARY KEY ("followerId","followingId")
);

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
