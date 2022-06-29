import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import argon2 from "argon2";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import morgan from "morgan";
import { v4 } from "uuid";

import connectRedis from "connect-redis";
const RedisStore = connectRedis(session);
import Redis from "ioredis";
import { FORGET_PASSWORD_PREFIX } from "../constants";
import sendEmail from "../utils/sendMail";
import getUserData from "../utils/getUserData";
import checkLoggedIn from "../utils/checkLoggedIn";
import makeUserDataFromUser from "../utils/makeUserDataFromUser";

dotenv.config();

const prisma = new PrismaClient();
const app: Express = express();
const port = process.env.PORT;
const corsOptions: cors.CorsOptions = {
  origin: "http://localhost:3031",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));

const client = new Redis({
  //default host/port
});
const store = new RedisStore({ client });

declare module "express-session" {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

app.use(
  session({
    secret: "this_is_a_secret",
    store: store,
    resave: false,
    saveUninitialized: false,
    rolling: true, // forces resetting of max age
    cookie: {
      maxAge: 360000,
      secure: false, // this should be true only when you don't want to show it for security reason
    },
  })
);
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  res.setHeader("Access-Control-Allow-Credentials", "true");

  next();
});

/* async function main() {
  // ... you will write your Prisma Client queries here
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); */

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/api/v1/auth/isloggedin", async (req: Request, res: Response) => {
  const userData = await getUserData(client);
  if (userData) {
    res.send(userData);
  } else {
    res.send(null);
  }
});

app.get("/api/v1/auth/logout", async (req: Request, res: Response) => {
  //req.logout();
  await client.del("userData");
  res.send("Logged out");
});

app.get("/api/v1/data/sensitive", async (req: Request, res: Response) => {
  if (await getUserData(client)) return res.send("Sensitive data");
  return res.send("Not logged in");
});

app.post(
  "/api/v1/data/userdatawithblogs",
  async (req: Request, res: Response) => {
    const userName = req.body.userName;
    if (!userName) return res.send("No user name");
    const userData = await getUserData(client);
    if (!userData) return res.send("Not logged in");
    const blogs = await prisma.post.findMany({
      where: {
        authorName: {
          equals: userName,
        },
      },
    });
    return res.json({
      email: userData.email,
      name: userData.name,
      blogs: blogs,
    });
  }
);
app.get(
  "/api/v1/data/userdatawithblogs",
  async (req: Request, res: Response) => {
    const userName = req.params.username as string;
    if (!userName) return res.send("No user name");
    const userData = await getUserData(client);
    if (!userData) return res.send("Not logged in");
    const blogs = await prisma.post.findMany({
      where: {
        authorName: {
          equals: userName,
        },
      },
    });
    return res.json({
      email: userData.email,
      name: userData.name,
      blogs: blogs,
    });
  }
);

app.get("/api/v1/data/blogdata/", async (req: Request, res: Response) => {
  const blogId = req.query.blogId;
  if (!blogId || typeof blogId !== "string") return res.send("No blog id");
  const blogIdNumber = parseInt(blogId);
  const blogData = await prisma.post.findFirst({
    where: {
      id: blogIdNumber,
    },
  });
  return res.json(blogData);
});

app.get(
  "/api/v1/data/checkifnameunique",
  async (req: Request, res: Response) => {
    const usernameToCheck = req.query.username;
    if (!usernameToCheck || typeof usernameToCheck !== "string")
      return res.send("No usernameToCheck");
    //const blogIdNumber = parseInt(usernameToCheck);
    const userWithSameName = await prisma.user.findFirst({
      where: {
        name: usernameToCheck,
      },
    });
    return res.json({ usernameUnique: userWithSameName === null });
  }
);

/* app.post(
  "/api/v1/data/userdatawithblogmetadata",
  async (req: Request, res: Response) => {
    const userName = req.body.userName;
    if (!userName) return res.send("No user name");
    const userData = await getUserData(client);
    if (!userData) return res.send("Not logged in");
    const blogs = await prisma.post.findMany({
      where: {
        authorName: {
          equals: userName,
        },
      },
    });
    const blogsMetaData = blogs.map((blog) => {
      return {
        author: userData.name,
        createdAt: blog.createdAt,
        title: blog.title,
        id: blog.id,
      };
    });

    return res.json({
      email: userData.email,
      name: userData.name,
      blogs: blogsMetaData,
    });
  }
); */

app.get(
  "/api/v1/data/userdatawithblogmetadata/:username",
  async (req: Request, res: Response) => {
    //const userName = req.body.userName;
    const userName = req.params.username as string;
    console.log(userName, "userName");
    if (!userName) return res.send("No user name");
    const userData = await getUserData(client);
    //if (!userData) return res.send("Not logged in");
    const blogs = await prisma.post.findMany({
      where: {
        authorName: {
          equals: userName,
        },
      },
    });
    const blogsMetaData = blogs.map((blog) => {
      return {
        author: userName,
        createdAt: blog.createdAt,
        title: blog.title,
        id: blog.id,
      };
    });

    return res.json({
      //email: userData.email,
      //name: userData.name,
      blogs: blogsMetaData,
    });
  }
);

app.post("/api/v1/auth/changepassword", async (req: Request, res: Response) => {
  if (await getUserData(client)) return res.send("Already logged in");
  if (
    !req.body.newPassword ||
    !req.body.token ||
    req.body.newPassword.length < 4
  ) {
    res.status(400).send("Bad request");
  }
  const token = req.body.token;
  const newPassword = req.body.newPassword;
  const key = FORGET_PASSWORD_PREFIX + token;
  const userID = await client.get(key);
  if (!userID) {
    res.status(400).send("Bad request");
    return;
  }
  const userIDNum = parseInt(userID);
  const user = await prisma.user.findFirst({ where: { id: userIDNum } });

  if (!user) {
    res.status(400).send("Bad request");
    return;
  }

  //await em.persistAndFlush(user);
  await prisma.user.update({
    where: {
      id: userIDNum,
    },
    data: {
      password: await argon2.hash(newPassword),
    },
  });
  await client.del(key);
  //Log in after change password
  return res.send("Password changed");
});

app.post(
  "/api/v1/auth/requestpasswordchange",

  async (req: Request, res: Response) => {
    if (await getUserData(client)) return res.send("Already logged in");
    if (!req.body.email) {
      res.send("Please enter an email");
    }
    const userEmail = req.body.email;
    const user = await prisma.user.findFirst({
      where: { email: req.body.email },
    });
    if (!user) {
      return res.send("User not found");
    }

    const token = v4();
    await client.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      "EX",
      1000 * 60 * 60 * 24 * 3
    );

    sendEmail(
      userEmail,
      `<a href=http://localhost:3031/change-password/${token}> Reset Password</a>`
    );
    return res.send("Email sent");
  }
);

app.get("/api/v1/data/userlist", (req: Request, res: Response) => {
  console.log(req.query, "Params");
  let page = req.query.page;
  let limit = req.query.limit;
  if (!(page || limit)) {
    return res.send("Bad request");
  }
  let pageInt, limitInt;
  pageInt = parseInt(page as string);
  limitInt = parseInt(limit as string);
  if (limitInt === NaN || pageInt === NaN) {
    return res.send("Bad request");
  }
  const userList = prisma.user
    .findMany({
      take: limitInt,
      skip: (pageInt - 1) * limitInt,
    })
    .then((userList) => {
      const userNameArray: string[] = [];
      userList.forEach((user) => {
        userNameArray.push(user?.name);
      });
      res.json(userNameArray);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

app.get("/api/v1/data/me", async (req: Request, res: Response) => {
  const userData = await getUserData(client);
  if (userData) {
    res.send(userData);
  } else {
    res.send(null);
  }
});

/* app.post("/api/v1/data/getuserblogs", async (req: Request, res: Response) => {
  if (!req.body.userName || typeof req.body.userName !== "string") {
    res.send("Please enter a userName");
  }
  const userName = req.body.userName;
  const blogs = await prisma.post.findMany({
    where: {
      author: {
        name: userName,
      },
    },
    take: 10,
  });
  res.json(blogs);
}); */

app.get(
  "/api/v1/data/getuserblogs/:username",
  async (req: Request, res: Response) => {
    const userName = req.params.username as string;
    if (!userName) {
      res.status(400).send("Bad request");
    }
    const blogs = await prisma.post.findMany({
      where: {
        author: {
          name: userName,
        },
      },
      take: 10,
    });
    res.json(blogs);
  }
);

app.get("/api/v1/data/getblogs", async (req: Request, res: Response) => {
  if (!req.body.userName || typeof req.body.userName !== "string") {
    res.send("Please enter a userName");
  }
  const userName = req.body.userName;
  const blogs = await prisma.post.findMany({
    where: {
      author: {
        name: userName,
      },
    },
    take: 10,
  });
  res.json(blogs);
});

app.post("/api/v1/data/addfollow", async (req: Request, res: Response) => {
  const currUserData = await getUserData(client);
  if (!currUserData) return res.send("Not logged in");
  const toFollowUserName = req.body.toFollowUserName;
  const userToFollow = await prisma.user.findFirst({
    where: {
      name: toFollowUserName,
    },
  });
  if (!userToFollow) return res.send("User not found");
  const userToFollowName = userToFollow.name;
  await prisma.follows.create({
    data: {
      follower: {
        connect: {
          name: currUserData.name,
        },
      },
      following: {
        connect: {
          name: userToFollowName,
        },
      },
    },
  });
  return res.send("Followed");
});

app.post("/api/v1/data/addblog", async (req: Request, res: Response) => {
  const currUserData = await getUserData(client);
  if (!currUserData) return res.send("Not logged in");
  if (!req.body.title || !req.body.content) {
    res.status(400).send("Bad request");
  }

  const user = await prisma.user.findFirst({
    where: {
      email: currUserData.email,
    },
  });
  if (user === null) {
    return res.send("Odd error");
  }

  const post = await prisma.post.create({
    data: {
      title: req.body.title,
      content: req.body.content,
      author: {
        connect: {
          name: user.name,
        },
      },
    },
  });
  res.send(post).status(200);
});

/* app.post("/api/v1/data/userdata", async (req: Request, res: Response) => {
  if (!req.body.userName) {
    res.status(400).send("Bad request");
  }
  const user = await prisma.user.findFirst({
    where: {
      name: req.body.userName,
    },
  });
  if (!user) {
    res.status(400).send("Bad request");
    return;
  }

  const userData = { name: user.name };
  res.json(userData);
}); */
app.get(
  "/api/v1/data/userdata/:username",
  async (req: Request, res: Response) => {
    const userName = req.params.username as string;
    if (!userName) {
      res.status(400).send("Bad request");
    }
    const user = await prisma.user.findFirst({
      where: {
        name: userName,
      },
    });
    if (!user) {
      res.status(400).send("Bad request");
      return;
    }

    const userData = { name: user.name };
    res.json(userData);
  }
);

app.post("/api/v1/auth/login", async (req: Request, res: Response) => {
  if (await checkLoggedIn(client)) return res.send("Already logged in");

  if (!req.body.email || !req.body.password) {
    return res.status(400).send("Bad request");
  }
  const user = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    return res.status(400).send("Bad request");
  }
  const passwordHash = await argon2.hash(req.body.password);
  if (!argon2.verify(user.password, passwordHash)) {
    console.log("Bad request");
    return res.status(400).send("Bad request");
  }

  client.set("userData", JSON.stringify(makeUserDataFromUser(user)));

  return res.json(user).status(200);

  /*  const { email, password } = req.body;
  if (
    !email ||
    !password ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    email.length === 0 ||
    password.length === 0
  ) {
    return res.status(400).send("Email and password are required");
  }
  const user = await prisma.user.findFirst({
    where: { email },
  });
  if (!user) {
    return res.status(401).send("User not found");
  }
  const valid = await argon2.verify(user.password, password);
  if (!valid) {
    return res.status(401).send("Invalid password");
  }

  return res.send(user); */
});

app.post("/api/v1/auth/register", async (req: Request, res: Response) => {
  if (await checkLoggedIn(client)) return res.send("Already logged in");

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).send("Bad request");
  }
  if (await prisma.user.findFirst({ where: { email } })) {
    return res.status(400).send("User already exists");
  }

  const passwordHash = await argon2.hash(password);
  try {
    const result = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        displayName: name,
      },
    });

    client.set("userData", JSON.stringify(makeUserDataFromUser(result)));
    res.header("Access-Control-Allow-Credentials", "true");
    return res.send(JSON.stringify(req.userData));
  } catch (e) {
    return res.status(400);
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
