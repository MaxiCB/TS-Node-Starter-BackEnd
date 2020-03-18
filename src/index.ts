/**
 * Required External Modules
 */

import {config} from "dotenv";
import express from "express";
import cors from "cors";
import {json, urlencoded} from "body-parser";
import {v2} from 'cloudinary'
import helmet from "helmet";

// Routers
import AccountsRouter from "./accounts/accounts-router";
import PostsRouter from "./posts/post-router";
import AuthRouter from "./auth/auth-router";

config();
v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

// v2.uploader.upload("src/test.png", (err, result) => {console.log(err, result)})

/**
 * App Variables
 */

if (!process.env.PORT) {
  process.exit(1);
}

console.log(process.env.NODE_ENV);

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Hello World" });
});

// Routers
app.use("/api/auth", AuthRouter);
app.use("/api/users", AccountsRouter);
app.use("/api/posts", PostsRouter);

/**
 * Server Activation
 */

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

/**
 * Webpack HMR Activation
 */

type ModuleId = string | number;

interface WebpackHotModule {
  hot?: {
    data: any;
    accept(
      dependencies: string[],
      callback?: (updatedDependencies: ModuleId[]) => void
    ): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    dispose(callback: (data: any) => void): void;
  };
}

declare const module: WebpackHotModule;

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}
