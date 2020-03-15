
export  interface post {
    post_title: string,
    post_author: string,
    post_content: string, 
}

export interface getPostResponse {
    post: post ,
}

export interface getPostsResponse {
    posts: post[]
}

export interface errorResponse {
    error: Error
}

export interface removePostResponse {
    id: number
}


export type PostResponseBuilder = (post: post) => getPostResponse
export type PostsResponseBuilder = (posts: post[]) => getPostsResponse
export type RemoveResponseBuilder = (id: number) => removePostResponse
export type ErrorResponseBuilder = (error: Error) => errorResponse


export const postResponseBuilder: PostResponseBuilder = post => ({post: post})
export const postsResponseBuilder: PostsResponseBuilder = posts => ({posts: posts})
export const removePostResponseBuilder: RemoveResponseBuilder = id => ({id})
export const errorResponseBuilder: ErrorResponseBuilder = error => ({error})