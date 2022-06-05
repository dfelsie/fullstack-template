import { User } from "@prisma/client";

export default function makeUserDataFromUser(user: User) {
  return {
    name: user.name,
    email: user.email,
    id: user.id,
  };
}
