export interface account {
  id: number;
  email: string;
  first_name: string;
  last_name?: string;
}

export interface getAccountsResponse {
  accounts: any;
}

export interface removeAccountResponse {
  deleted: number;
}

export interface errorResponse {
  error: Error;
}

export type AccountsResponseBuilder = (accounts: any) => getAccountsResponse;
export type RemoveResponseBuilder = (account: number) => removeAccountResponse;
export type ErrorBuilder = (error: Error) => errorResponse;

export const accountsResponseBuilder: AccountsResponseBuilder = accounts => ({
  accounts: accounts
});
export const removeAccountBuilder: RemoveResponseBuilder = account => ({
  deleted: account
});
export const errorBuilder: ErrorBuilder = error => ({ error: error });
