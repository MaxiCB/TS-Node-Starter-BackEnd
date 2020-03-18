import express from "express";

import { accountLoginHandler, accountRegisterHandler } from "./auth-handler";

import { validateFields, tokenHandler } from "../auth/auth-middleware";

const router = express.Router();

router.post("/login", validateFields, tokenHandler, accountLoginHandler);
router.post("/register", validateFields, accountRegisterHandler);

export default router;
