import express from "express";

import {
  getAccountsHandler,
  getAccountByIDHandler,
  updateAccountHandler,
  removeAccountHandler
} from "./accounts-handler";

import { privateRoute, tokenHandler } from "../auth/auth-middleware";

const router = express.Router();

router.get("/", privateRoute, getAccountsHandler);
router.get("/:id", privateRoute, getAccountByIDHandler);
router.put("/:id", tokenHandler, updateAccountHandler);
router.delete("/:id", tokenHandler, removeAccountHandler);

export default router;
