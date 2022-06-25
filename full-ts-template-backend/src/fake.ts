import { faker } from "@faker-js/faker";
import { PrismaClient, User, Post } from "@prisma/client";
// import { faker } from '@faker-js/faker/locale/de';
const prisma = new PrismaClient();

function createRandomUser(): User {
  return {
    id: faker.datatype.number({ max: 10000000 }),
    email: faker.internet.email(),
    name: faker.internet.userName(),
    displayName: faker.name.firstName(),
    password: faker.internet.password(),
  };
}

async function createRandomPost(userAry: User[]): Promise<Post> {
  return {
    content: faker.lorem.paragraphs(),
    createdAt: faker.datatype.datetime(),
    id: faker.datatype.number({ max: 10000000 }),
    published: false,
    title: faker.address.city(),
    updatedAt: new Date(),
    authorName: faker.helpers.arrayElement(userAry).name,
  };
}

async function users(num: number) {
  const users: User[] = [];
  Array.from({ length: num }).forEach(() => {
    users.push(createRandomUser());
  });
  let user: User;
  let numFollowers;
  users.forEach((user, index, userAry) => {
    numFollowers = Math.ceil(Math.random() * 5);
    for (let i = 0; i < numFollowers; i++) {
      prisma.follows.create({
        data: {
          follower: {
            connect: {
              name: faker.helpers.arrayElement(userAry).name,
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
  await prisma.user.createMany({
    data: users,
  });
}

async function posts(num: number) {
  const posts: Post[] = [];
  const dbUsers = await prisma.user.findMany();

  Array.from({ length: num }).forEach(async () => {
    posts.push(await createRandomPost(dbUsers));
  });
  prisma.post.createMany({
    data: posts,
  });
}

function clear() {
  prisma.user.deleteMany();
}

//Add in a reset db function
