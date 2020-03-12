// Express Types
import { Request, Response } from "express";
// Accounts Methods
import { find, findById, add, update } from "./accounts-model";

interface account {
  id: number;
  email: string;
  first_name: string;
  last_name?: string;
}

const obj: account = {
  email: "devin@gmail",
  id: 3,
  first_name: "devin"
  // last name missing ## note ?
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

interface error2 { 
  message: string,
  id?: number
}

type AccountsResponseBuilder = (accounts: any) => getAccountsResponse;
type ErrorBuilder = (error: Error) => errorResponse;

const accountsResponseBuilder: AccountsResponseBuilder = accounts => ({
  accounts: accounts
});
const errorBuilder: ErrorBuilder = error => ({ error: error });

export const getAccountsHandler = (_req: Request, res: Response) => {
  find()
    .then((accounts: Array<account>) => {
      if (accounts) {
        const response = accountsResponseBuilder(accounts);
        return res.status(200).json(response);
      } else {
        const error: error2 = {
          // name: "No Users",
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
        const error: Error = { //ctrl click error to see type deffinetion
          name: "Bad Request",
          message: "Invalid account id",
          // stack: "hello",
          
        };
        res.status(404).json(error);
      }
    })
    .catch((err: Error) => {
      res.status(500).json(err);
    });
};

export const addAccountHandler = (req: Request, res: Response) => {
  const account = req.body;
  if (account) {
    add(account)
      .then(status => {
        const response = { message: "Created account", accountID: status[0] };
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
    res.status(400).send(error);
  }
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
        return res.send({error: err, message: 'Unigue Email is required'});
      });
  } else {
    const error: Error = {
      name: "Bad Request",
      message: "Invalid information provided"
    };
    res.status(400).send(error);
  }
};

export const removeAccountHandler = (req: Request, res: Response) => {
    
}


