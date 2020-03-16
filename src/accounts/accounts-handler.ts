// Express Types
import { Request, Response } from "express";
// Accounts Methods
import { find, findById, update, remove } from "./accounts-model";
import {
  account,
  accountsResponseBuilder,
  errorBuilder,
  removeAccountBuilder
} from "./types";

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
          //ctrl click error to see type deffinetion
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

export const updateAccountHandler = (req: Request, res: Response) => {
  const { body } = req;
  const accountUpdate = body;
  console.log(body);
  const { params } = req;
  const id: number = parseInt(params.id);
  if (accountUpdate) {
    update(accountUpdate, id)
      .then(status => {
        const response = { message: "Updated account", accountID: status };
        return res.send(response);
      })
      .catch((err: Error) => {
        return res.send({ error: err, message: "Unigue Email is required" });
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
