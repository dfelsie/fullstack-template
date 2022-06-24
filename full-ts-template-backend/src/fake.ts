import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
// import { faker } from '@faker-js/faker/locale/de';
const prisma = new PrismaClient();

function createRandomUser(): any {
  return {
    userId: faker.datatype.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}

function users(num: number) {
  const users: any[] = [];
  Array.from({ length: 10 }).forEach(() => {
    users.push(createRandomUser());
  });
  prisma.user.createMany({
    data: users,
  });
}

//Add in a reset db function
