// Express Types
import { Request, Response } from "express";
// Accounts Methods
import { findByEmail, add } from "../accounts/accounts-model";
// Bcrypt
import { hashSync } from "bcryptjs";
// JWT
import { sign } from "jsonwebtoken";
import { jwtSecret } from "../config/secrets";

export const accountLoginHandler = (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (email && password) {
    findByEmail(email)
      .then(user => {
        const token = generateToken(user);
        res.status(200).send({
          message: `Welcome ${user.email}, have a token`,
          token: token
        });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  } else {
    res.status(400).send({ error: "No account information provided" });
  }
};

export const accountRegisterHandler = (req: Request, res: Response) => {
  let account = req.body;
  if (account.email && account.password) {
    const hash = hashSync(account.password, 14);
    account.password = hash;
    findByEmail(account.email)
      .then(user => {
        if (user) {
          res.status(400).send({ error: "That email is already taken" });
        } else {
          add(account)
            .then(id => {
              res
                .status(201)
                .send({ message: "Account created", accountID: id });
            })
            .catch(err => res.send({ err: err }));
        }
      })
      .catch(() => {
        res.status(500).send({ error: "Internal server error" });
      });
  } else {
    res.status(400).send({ error: "No account information provided" });
  }
};

const generateToken = (user: any) => {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "1d"
  };

  return sign(payload, jwtSecret, options);
};
