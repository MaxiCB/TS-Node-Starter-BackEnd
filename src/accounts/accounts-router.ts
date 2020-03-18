import express from "express";

import {
  getAccountsHandler,
  getAccountByIDHandler,
  updateAccountHandler,
  removeAccountHandler,
  addAccountImageHandler
} from "./accounts-handler";

import { privateRoute } from "../auth/auth-middleware";

import {join} from 'path'
import * as multer from 'multer'

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/accounts/images')
  },
  filename: (req, file, cb) => {
    const id = req.params.id
    let filetype = ''
    if(file.mimetype === 'image/jpeg') {
      filetype = 'jpeg'
    }
    cb(null, `account-${id}.${filetype}`)
  }
})

const upload = multer.default({storage: storage})

router.post('/:id', upload.single('file'), addAccountImageHandler)

router.get("/", privateRoute, getAccountsHandler);
router.get("/:id", privateRoute, getAccountByIDHandler);
router.put("/:id", privateRoute, updateAccountHandler);
router.delete("/:id", privateRoute, removeAccountHandler);

export default router;
