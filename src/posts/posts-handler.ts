import { Request, Response, NextFunction } from "express";

import { add, find, findById, remove, update } from "./post-model";
import {
  post,
  postsResponseBuilder,
  errorResponseBuilder,
  postResponseBuilder,
  removePostResponseBuilder
} from "./types";
import { v2 } from "cloudinary";

export const getPostsHandler = (_req: Request, res: Response) => {
  find()
    .then((posts: post[]) => {
      if (posts) {
        const response = postsResponseBuilder(posts);
        return res.send(response);
      } else {
        const err: Error = {
          name: "No Posts",
          message: "There are no post in the database"
        };
        const response = errorResponseBuilder(err);
        return res.status(200).send(response);
      }
    })
    .catch((err: Error) => {
      const error = errorResponseBuilder(err);
      return res.status(500).send(error);
    });
};

export const getPostHandler = (req: Request, res: Response) => {
  const { params } = req;
  const id: number = parseInt(params.id);
  findById(id)
    .then((post: post) => {
      if (post) {
        const response = postResponseBuilder(post);
        return res.status(200).send(response);
      } else {
        const err: Error = {
          name: "Bad Request",
          message: "Invalid Post ID"
        };
        const response = errorResponseBuilder(err);
        return res.status(404).send(response);
      }
    })
    .catch((err: Error) => {
      const error = errorResponseBuilder(err);
      return res.status(500).send(error);
    });
};

export const removePostHandler = (req: Request, res: Response) => {
  const { params } = req;
  const id: number = parseInt(params.id);
  remove(id)
    .then(deleted => {
      if (deleted) {
        const response = removePostResponseBuilder(deleted);
        return res.json(response);
      } else {
        return res
          .status(404)
          .json({ mesage: "Could not find an post with that ID" });
      }
    })
    .catch(() => {
      const error: Error = {
        name: "Internal Server Error",
        message: "Failed to check and delete post"
      };
      return res.status(500).send(error);
    });
};

export const addPostHandler = (req: Request, res: Response) => {
  const post: post = req.body;
  add(post).then(id => {
    findById(id[0])
      .then((post: post) => {
        if (post) {
          const response = postResponseBuilder(post);
          return res.status(200).send(response);
        } else {
          const err: Error = {
            name: "Bad Request",
            message: "Unable to find a post with the provided ID"
          };
          const response = errorResponseBuilder(err);
          return res.status(404).send(response);
        }
      })
      .catch((err: Error) => {
        const error = errorResponseBuilder(err);
        return res.status(500).send(error);
      });
  });
};
export const updatePostHandler = (req: Request, res: Response) => {
  const { body } = req;
  const postUpdate = body;
  const { params } = req;
  const id: number = parseInt(params.id);
  if (postUpdate) {
    update(postUpdate, id)
      .then(status => {
        const response = { message: "Updated post", postID: status };
        return res.status(200).send(response);
      })
      .catch((err: Error) => {
        return res.status(400).send(err);
      });
  } else {
    const error: Error = {
      name: "Bad Request",
      message: "Invalid information provided"
    };
    return res.status(400).send(error);
  }
};

export const addPostImageHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { params } = req;
  const { id } = params;
  if (!req.file) {
    res.status(500).json({ error: "Image not included with request" });
    return next();
  }
  v2.uploader
    .upload(`public/posts/images/account-${id}.jpeg`, (err, result) => {
      if (!err) {
        update({ profileImage: result.url }, parseInt(id))
          .then(success => {
            console.log(success);
          })
          .catch(err => {
            res.status(500).json(err);
          });
      } else {
        console.log(err);
      }
    })
    .then(() => res.json({ message: "Successfully added account image!" }))
    .catch(err => res.status(500).json(err));
};
