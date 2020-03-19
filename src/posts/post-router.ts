import express from "express";
import {
  getPostsHandler,
  getPostHandler,
  removePostHandler,
  updatePostHandler,
  addPostHandler,
  addPostImageHandler,
  getPostsByAuthor
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
router.post('/:id', upload.single('file'), privateRoute, addPostImageHandler)

/**
 * Testing of fetching a specific users post
 * @param UserID: number
 * @returns Array
 */
router.get('/author/:id', privateRoute, getPostsByAuthor)

router.get("/", privateRoute, getPostsHandler);
router.post("/", privateRoute, addPostHandler);
router.get("/:id", privateRoute, getPostHandler);
router.put("/:id", privateRoute, updatePostHandler);
router.delete("/:id", privateRoute, removePostHandler);

export default router;
