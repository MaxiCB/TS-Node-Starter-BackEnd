import {Request , Response} from "express"

import {add,find,findById,remove,update} from './post-model'
import { finished } from "stream"

interface post {
    post_title: string,
    post_author: string,
    post_content: string, 
}

interface getPostResponse {
    post: post ,
}

interface getPostsResponse {
    posts: post[]
}

interface errorResponse {
    error: Error
}

interface removePostResponse {
    id: number
}

type PostResponseBuilder = (post: post) => getPostResponse
type PostsResponseBuilder = (posts: post[]) => getPostsResponse
type RemoveResponseBuilder = (id: number) => removePostResponse
type ErrorResponseBuilder = (error: Error) => errorResponse


const postResponseBuilder: PostResponseBuilder = post => ({post: post})
const postsResponseBuilder: PostsResponseBuilder = posts => ({posts: posts})
const removePostResponseBuilder: RemoveResponseBuilder = id => ({id})
const errorResponseBuilder: ErrorResponseBuilder = error => ({error})

export const getPostsHandler = (_req: Request, res: Response) => {
    find()
    .then((posts: post[]) => {
        if(posts){
            const response = postsResponseBuilder(posts)
            return res.send(response)
        }
        else{
            const err: Error = {
                name: "no posts",
                message: "no posts inside of the Database"                
            }
            const response = errorResponseBuilder(err)
            return res.status(200).send(response)
        }
    })
    
    .catch( (err: Error) => {
        const error = errorResponseBuilder(err)
        return res.status(500).send(error)
    })

}