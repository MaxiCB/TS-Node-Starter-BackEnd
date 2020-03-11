// Express Types
import { Request, Response } from "express";
// Accounts Methods
import { find, findById } from "./accounts-model";

// This validates the user as well as updates the user metadata
// This needs to stay serverside to allow for checking permissions and status
// Need to break updating into seperate call, which is fired upon initial signup

interface account {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

interface getAccountsResponse {
  accounts: any;
}

interface removeAccountResponse {
  status: boolean;
}

interface errorResponse {
  error: Error;
}

type AccountsResponseBuilder = (accounts: any) => getAccountsResponse;
type ErrorBuilder = (error: Error) => errorResponse;

const accountsResponseBuilder: AccountsResponseBuilder = accounts => ({
  accounts: accounts
});
const errorBuilder: ErrorBuilder = error => ({ error: error });

export const getAccountsHandler = (_req: Request, res: Response) => {
  find()
    .then((accounts: account) => {
      if (accounts) {
        const response = accountsResponseBuilder(accounts);
        return res.status(200).json(response);
      } else {
        const error: Error = {
          name: "No Users",
          message: "There are no users in the database"
        };
        res.status(200).json(error);
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
        res.status(200).json(response);
      } else {
        const error: Error = {
          name: "Bad Request",
          message: "Invalid account id"
        };
        res.status(404).json(error);
      }
    })
    .catch((err: Error) => {
      res.status(500).json(err);
    });
};
