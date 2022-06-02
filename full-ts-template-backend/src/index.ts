import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import argon2 from "argon2";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import * as PassportLocal from "passport-local";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import morgan from "morgan";

import connectRedis from "connect-redis";
const RedisStore = connectRedis(session);
import Redis from "ioredis";
import { isLoggedIn, isNotLoggedIn } from "./middleware/auth";

dotenv.config();

const prisma = new PrismaClient();
const app: Express = express();
const port = process.env.PORT;
const corsOptions: cors.CorsOptions = {
  origin: "http://localhost:3031",
  credentials: true,
};
app.use(passport.initialize());
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
app.use(passport.session());
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
  if (await client.exists("userName")) {
    const useName = await client.get("userName");
    if (typeof useName === "string") {
      res.json(JSON.parse(useName));

      return;
    }
  } else {
    res.json({ name: false });
  }

  //return req.user ? res.send(req.user) : res.send(false);
});

passport.use(
  new PassportLocal.Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },

    async function (username, password, done) {
      // look for the user data
      await prisma.user
        .findFirst({
          where: {
            email: username,
          },
        })
        .then(async (user) => {
          if (!user) return done(null, false);
          if (!(await argon2.verify(user.password, password)))
            return done(null, false);
          return done(null, user);
        })
        .catch((err) => {
          console.log(err);
          return done(err);
        });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user: any, done) => {
  done(null, user);
});

app.get("/api/v1/auth/logout", (req: Request, res: Response) => {
  req.logout();
  client.del("userName");

  res.send("Logged out");
});

app.get("/api/v1/data/sensitive", isLoggedIn, (req: Request, res: Response) => {
  res.send("Sensitive data");
});

passport.use(
  "register",
  new PassportLocal.Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (username, _, done) {
      // look for the user data
      await prisma.user
        .findFirst({
          where: {
            email: username,
          },
        })
        .then((user) => {
          if (!user) {
            return done(null, true);
          }
          return done(null, false);
        })
        .catch((err) => {
          console.log(err);
          return done(err);
        });
    }
  )
);

app.post(
  "/api/v1/auth/login",
  passport.authenticate("local"),
  async (req: Request, res: Response) => {
    client.set("userName", JSON.stringify(req.user));
    res.json(req.user).status(200);

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
  }
);

app.post(
  "/api/v1/auth/register",
  isNotLoggedIn,
  passport.authenticate("register"),
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const passwordHash = await argon2.hash(password);
    try {
      const result = await prisma.user.create({
        data: {
          name,
          email,
          password: passwordHash,
        },
      });
      req.user = result;
      client.set("userName", name);
      res.header("Access-Control-Allow-Credentials", "true");
      return res.send(result);
    } catch (e) {
      return res.status(400);
    }
  }
);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
