-- CreateTable
CREATE TABLE "FollowersOfUser" (
    "id" SERIAL NOT NULL,
    "userName" VARCHAR(255) NOT NULL,

    CONSTRAINT "FollowersOfUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FollowersOfUser_userName_key" ON "FollowersOfUser"("userName");

-- AddForeignKey
ALTER TABLE "FollowersOfUser" ADD CONSTRAINT "FollowersOfUser_userName_fkey" FOREIGN KEY ("userName") REFERENCES "User"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
