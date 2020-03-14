import express from "express";

import {
  getAccountsHandler,
  getAccountByIDHandler,
  addAccountHandler,
  updateAccountHandler,
  removeAccountHandler
} from "./accounts-handler";

const router = express.Router();

router.get("/", getAccountsHandler);
router.get("/:id", getAccountByIDHandler);
router.post("/", addAccountHandler);
router.post("/:id", updateAccountHandler);
router.delete("/:id", removeAccountHandler);

export default router;