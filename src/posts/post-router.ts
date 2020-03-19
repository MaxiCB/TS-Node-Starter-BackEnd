import express from "express";
import {
  getPostsHandler,
  getPostHandler,
  removePostHandler,
  updatePostHandler,
  addPostHandler,
  addPostImageHandler,
  getPostsByAuthor,
  getPostsByPartial
} from "./posts-handler";

import { privateRoute } from "../auth/auth-middleware";

import * as multer from "multer";

const router = express.Router();

// Multer image handling.
// Look into seperating this and making it dynamic and usable betweem routes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/posts/images");
  },
  filename: (req, file, cb) => {
    const id = req.params.id;
    let filetype = "jpeg";
    if (file.mimetype === "image/jpeg") {
      filetype = "jpeg";
    }
    cb(null, `post-${id}.${filetype}`);
  }
});

const upload = multer.default({ storage: storage });
router.post("/:id", upload.single("file"), privateRoute, addPostImageHandler);


router.get("/", privateRoute, getPostsHandler);
router.get("/:id", privateRoute, getPostHandler);
router.get("/author/:id", privateRoute, getPostsByAuthor);
router.get("/search/:string", privateRoute, getPostsByPartial);

router.post("/", privateRoute, addPostHandler);
router.put("/:id", privateRoute, updatePostHandler);
router.delete("/:id", privateRoute, removePostHandler);

export default router;
