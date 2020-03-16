import express from "express";
import {
  getPostsHandler,
  getPostHandler,
  removePostHandler,
  updatePostHandler,
  addPostHandler
} from "./posts-handler";

import { privateRoute, tokenHandler } from "../auth/auth-middleware";

const router = express.Router();

router.get("/", privateRoute, getPostsHandler);
router.post("/", privateRoute, addPostHandler);
router.get("/:id", privateRoute, getPostHandler);
router.put("/:id", privateRoute, updatePostHandler);
router.delete("/:id", tokenHandler, removePostHandler);

export default router;
