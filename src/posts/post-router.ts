import express from "express"
import {
    getPostsHandler
} from "./posts-handler"

const router = express.Router()

router.get("/post" , getPostsHandler)


export default router