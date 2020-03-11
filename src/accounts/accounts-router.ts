import express from "express";

import { getAccountsHandler, getAccountByIDHandler } from "./accounts-handler";

const router = express.Router();

router.get("/", getAccountsHandler);
router.get("/:id", getAccountByIDHandler);

export default router;
