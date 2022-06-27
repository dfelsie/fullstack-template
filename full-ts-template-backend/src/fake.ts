import { faker } from "@faker-js/faker";
import { PrismaClient, User, Post } from "@prisma/client";
import argon2 from "argon2";

/* import yargs, { Argv, number } from "yargs";
const argv2 = yargs(process.argv.slice(2))
  .option("num", {
    type: "string",
    demandOption: false,
    requiresArg: false,
  })
  .parseSync();
console.log(argv2.n);

 */

const prisma = new PrismaClient();

function createRandomUser(userNum: number): any {
  // password: await argon2.hash(newPassword),

  return {
    //id: faker.datatype.number({ max: 10000000 }),
    email: faker.internet.email() + userNum,
    name: faker.internet.userName() + userNum,
    displayName: faker.name.firstName(),
    password: faker.internet.password(),
  };
}

async function users(num: number) {
  const users: any[] = [];
  const numUserRecords = await prisma.user.count();
  Array.from({ length: num }).forEach((_, index) => {
    users.push(createRandomUser(numUserRecords + index));
  });
  let user: User;
  let numFollowers;
  await prisma.user.createMany({
    data: users,
  });
  users.forEach(async (user, index, userAry) => {
    const MAXNUMBERFOLLOWERS = 5;
    numFollowers = Math.ceil(Math.random() * MAXNUMBERFOLLOWERS) + 1;
    for (let i = 1; i <= numFollowers; i++) {
      let follower = faker.helpers.arrayElement(
        userAry.slice(
          Math.floor((num / MAXNUMBERFOLLOWERS) * i),
          (num / MAXNUMBERFOLLOWERS) * (i + 1)
        )
      );
      await prisma.follows.create({
        data: {
          follower: {
            connect: {
              name: follower.name,
            },
          },
          following: {
            connect: {
              name: user.name,
            },
          },
        },
      });
    }
  });
}

function createRandomPost(userAry: User[]): any {
  return {
    content: faker.lorem.paragraphs(),
    published: false,
    title: faker.address.city(),
    authorName: faker.helpers.arrayElement(userAry).name,
  };
}

async function posts(num: number) {
  const posts: Post[] = [];
  const dbUsers = await prisma.user.findMany();
  let postData;
  for (let i = 0; i < num; i++) {
    postData = createRandomPost(dbUsers);
    await prisma.post.create({
      data: {
        title: postData.title,
        content: postData.content,
        published: postData.published,
        author: {
          connect: {
            name: postData.authorName,
          },
        },
      },
    });
  }
}

function clear() {
  prisma.user.deleteMany();
}

posts(100);

//Add in a reset db function
