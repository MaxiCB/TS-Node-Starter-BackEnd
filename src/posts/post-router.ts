import express from "express"
import {
    getPostsHandler,
    getPostHandler,
    removePostHandler


} from "./posts-handler"

const router = express.Router()

router.get("/post" , getPostsHandler)
router.get("/post/:id" , getPostHandler)
router.delete("/post/:id" , removePostHandler)


export default router