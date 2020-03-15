import { Request, Response } from "express";

import { add, find, findById, remove, update } from "./post-model";
import {
  post,
  postsResponseBuilder,
  errorResponseBuilder,
  postResponseBuilder,
  removePostResponseBuilder
} from "./types";

export const getPostsHandler = (_req: Request, res: Response) => {
  find()
    .then((posts: post[]) => {
      if (posts) {
        const response = postsResponseBuilder(posts);
        return res.send(response);
      } else {
        const err: Error = {
          name: "no posts",
          message: "no posts inside of the Database"
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

  //parse INT ?????
  const id: number = parseInt(params.id);

  /// omg typse script is AMZIng i did ctrl clcik and realized i was missing id

  findById(id) // dont understand why this is erroring out  ***UPDATE FIXED
    .then((post: post) => {
      if (post) {
        const response = postResponseBuilder(post);
        return res.send(response);
      } else {
        const err: Error = {
          name: "no post",
          message: "no post inside of the Database with this ID"
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

export const removePostHandler = (req: Request, res: Response) => {
  const { params } = req;
  const id: number = parseInt(params.id);
  //the reason I doubled nested these was to give a more acurate error if the was trying to delete something that deosnt exist
  findById(id)
    .then((post: post) => {
      if (post) {
        remove(id).then((id: number) => {
          const response = removePostResponseBuilder(id);
          return res.send(response);
        });
      } else {
        const err: Error = {
          name: "no post with this iD",
          message: "no post inside of the Database with this ID"
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

export const addPostHandler = (req: Request, res: Response) => {
  const post: post = req.body;
  add(post).then(id => {
    findById(id[0])
      .then((post: post) => {
        if (post) {
          const response = postResponseBuilder(post);
          return res.send(response);
        } else {
          const err: Error = {
            name: "no post",
            message: "no post inside of the Database with this ID"
          };
          const response = errorResponseBuilder(err);
          return res.status(200).send(response);
        }
      })
      .catch((err: Error) => {
        const error = errorResponseBuilder(err);
        return res.status(500).send(error);
      });
  });
};
export const updatePostHandler = (req: Request, res: Response) => {
    const post: post = req.body;
    const { params } = req;
  const id: number = parseInt(params.id);
    update(post, id )
    .then((id: number) => {
        findById(id)
      .then((post: post) => {
        if (post) {
          const response = postResponseBuilder(post);
          return res.send(response);
        } else {
          const err: Error = {
            name: "no post",
            message: "no post inside of the Database with this ID"
          };
          const response = errorResponseBuilder(err);
          return res.status(200).send(response);
        }
      })
      .catch((err: Error) => {
        const error = errorResponseBuilder(err);
        return res.status(500).send(error);
      });
    })
}
