import express from "express";

import {
  getAccountsHandler,
  getAccountByIDHandler,
  updateAccountHandler,
  removeAccountHandler,
  addAccountImageHandler,
  getAccountImageHandler
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
    let filetype = 'jpeg'
    if(file.mimetype === 'image/jpeg') {
      filetype = 'jpeg'
    }
    cb(null, `account-${id}.${filetype}`)
  }
})

const upload = multer.default({storage: storage})

router.post('/:id', upload.single('file'), privateRoute, addAccountImageHandler)

// Development only endpoint. Image is stored on the user object
router.get('/image/:id', getAccountImageHandler)

router.get("/", privateRoute, getAccountsHandler);
router.get("/:id", privateRoute, getAccountByIDHandler);
router.put("/:id", privateRoute, updateAccountHandler);
router.delete("/:id", privateRoute, removeAccountHandler);

export default router;
