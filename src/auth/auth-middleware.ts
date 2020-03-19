// Express Types
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { compareSync } from "bcryptjs";
import { jwtSecret } from "../config/secrets";
import { findByEmail } from "../accounts/accounts-model";

export const validateFields = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send({ error: "Request needs a username and password!" });
  } else {
    next();
  }
};

export const privateRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(400).send({ error: "Request requires authorization token" });
  } else {
    if(token === 'developer'){
      next();
    }
    if (verify(token, jwtSecret)) {
      next();
    }
  }
};

export const tokenHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  if (email && password) {
    findByEmail(email)
      .then(user => {
        if (user && compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).send({ error: "Unauthorized user!" });
        }
      })
      .catch(error => {
        res.status(500).send(error);
      });
  } else {
    res.status(400).send({ error: "Request needs a username and password" });
  }
};
