// Express Types
import { Request, Response, NextFunction } from "express";
// Accounts Methods
import { find, findById, findByPartial, update, remove, findByEmailPartial } from "./accounts-model";
import {
  account,
  accountsResponseBuilder,
  errorBuilder,
  removeAccountBuilder
} from "./types";

import { v2 } from "cloudinary";

export const getAccountsHandler = (_req: Request, res: Response) => {
  find()
    .then((accounts: Array<account>) => {
      if (accounts) {
        const response = accountsResponseBuilder(accounts);
        return res.status(200).json(response);
      } else {
        const error: Error = {
          name: "No Users",
          message: "There are no users in the database"
        };
        return res.status(200).json(error);
      }
    })
    .catch((err: Error) => {
      const error = errorBuilder(err);
      return res.status(500).json(error);
    });
};

export const getAccountByIDHandler = (req: Request, res: Response) => {
  const { params } = req;
  const id: number = parseInt(params.id);
  findById(id)
    .then((account: account) => {
      if (account) {
        const response = accountsResponseBuilder(account);
        return res.status(200).json(response);
      } else {
        const error: Error = {
          name: "Bad Request",
          message: "Invalid account id"
        };
        return res.status(404).json(error);
      }
    })
    .catch((err: Error) => {
      return res.status(500).json(err);
    });
};

export const getAccountByEmailHandler = (req: Request, res: Response) => {
  const { params } = req;
  const string: string = params.string;
  findByEmailPartial(string)
    .then((account: account[]) => {
      if (account) {
        const response = accountsResponseBuilder(account);
        return res.status(200).json(response);
      } else {
        const error: Error = {
          name: "Bad Request",
          message: "Invalid account email"
        };
        return res.status(404).json(error);
      }
    })
    .catch((err: Error) => {
      return res.status(500).json(err);
    });
};

export const getAccountByPartialHandler = (req: Request, res: Response) => {
  const { params } = req;
  const string: string = params.string;
  findByPartial(string)
    .then((accounts: account[]) => {
      if (accounts) {
        const response = accountsResponseBuilder(accounts);
        return res.status(200).json(response);
      } else {
        const error: Error = {
          name: "Bad Request",
          message: "Invalid Search Param"
        };
        return res.status(404).json(error);
      }
    })
    .catch((err: Error) => {
      return res.status(500).json(err);
    });
};

export const updateAccountHandler = (req: Request, res: Response) => {
  const { body } = req;
  const accountUpdate = body;
  const { params } = req;
  const id: number = parseInt(params.id);
  if (accountUpdate) {
    update(accountUpdate, id)
      .then(status => {
        const response = { message: "Updated account", accountID: status };
        return res.send(response);
      })
      .catch((err: Error) => {
        return res.send(err);
      });
  } else {
    const error: Error = {
      name: "Bad Request",
      message: "Invalid information provided"
    };
    return res.status(400).send(error);
  }
};

export const removeAccountHandler = (req: Request, res: Response) => {
  const { params } = req;
  const id: number = parseInt(params.id);
  remove(id)
    .then(deleted => {
      if (deleted) {
        const response = removeAccountBuilder(deleted);
        return res.json(response);
      } else {
        return res
          .status(404)
          .json({ mesage: "Could not find an account with that ID" });
      }
    })
    .catch(() => {
      const error: Error = {
        name: "Internal Server Error",
        message: "Failed to check and delete account"
      };
      return res.status(500).send(error);
    });
};

export const addAccountImageHandler = (
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
    .upload(`public/accounts/images/account-${id}.jpeg`, (err, result) => {
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

export const getAccountImageHandler = (req: Request, res: Response) => {
  const { params } = req;
  const { id } = params;
  res.sendFile(`account-${id}.jpeg`, { root: "public/accounts/images/" });
};
