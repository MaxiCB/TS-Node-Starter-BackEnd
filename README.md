# Typescript Node Knex Backend
Project Description here
## Schema
**Users**
| Field | Type | Notes |
|-------|-------|------|
|UserID|Int|Primary Key - Auto Generated|
|Email|String|Required - Unique Value|
|Password|String|Required|
|First Name|String|Optional - Provided by the User|
|Last Name|String|Optional - Provided by the User|

**Posts**
| Field | Type | Notes |
|-------|-------|------|
| PostID|Int|Primary Key - Auto Generated|
| Title|String|Required|
|Author|UserID|Required|
|Content|String|Required|
## API
BASE URL : -Need To Deploy-

Seeding data for development and testing
## Table of Contents
**Auth**
|Type|Path|Notes|Example|
|--|--|--|--|
|POST|`/api/auth/login`|Login a User|[Link](#post-apiauthlogin)|
|POST|`/api/auth/register`|Register a new  User|[Link](#post-apiauthregister)|

**Users**
|Type|Path|Notes|Example|
|--|--|--|--|
|PUT|`/api/users/:id`|Update a User|[Link](#put-apiusers_id)|
|POST|`/api/users/:id`|Add a Image to a User|[Link](#post-apiusers_id)|
|GET|`/api/users/`|Fetch all User's|[Link](#get-apiusers)|
|GET|`/api/users/:id`|Fetch a User by ID|[Link](#get-apiusers_id)|
|GET|`/api/users/search/:string`|Fetch a User by partial Name|[Link](#get-apiuserssearch_string)|
|GET|`/api/users/email/:string`|Fetch a User by partial Email|[Link](#get-apiusersemail_string)|
|DEL|`/api/users/:id`|Delete a User|[Link](#del-apiusers_id)|

**Posts**
|Type|Path|Notes|Example|
|--|--|--|--|
|POST|`/api/posts/`|Add a Post|[Link](#post-apiposts)|
|POST|`/api/posts/:id`|Add a Image to a Post|[Link](#post-apiposts_id)|
|PUT|`/api/posts/:id`|Update a Post|[Link](#put-apiposts_id)|
|GET|`/api/posts/`|Fetch all Post's|[Link](#get-apiposts)|
|GET|`/api/posts/:id`|Fetch a Post by PostID|[Link](#get-apiposts_id)|
|GET|`/api/posts/author/:authorID`|Fetch all posts by UserID|[Link](#get-apipostsauthor_authorID)|
|GET|`/api/posts/search/:string`|Fetch all posts by partial Title or Content|[Link](#get-apipostssearch_string)|
|DEL|`/api/posts/:id`|Delete a Post|[Link](#del-apiposts_id)|

**Analytics**
|Type|Path|Notes|Example|
|--|--|--|--|
|GET|/api/posts/|Fetch all Post's||
|GET|/api/posts/:id|Fetch a Post by ID||
|GET|/api/posts/:Userid|Fetch all posts by UserID||

# Examples

## User Examples

### Account Registration
#### POST /api/auth/register
Request Data
```json
{
    "email": "",
    "password": "",
    "first_name": "",
    "last_name": ""
}
```
Response Data
```json
{
    "message": "",
    "accountID": [
        id
    ]
}
```
### Account Login
#### POST /api/auth/login
Request Data
```json
{
    "email": "",
    "password": ""
}
```
Response Data
```json
{
    "message": "Welcome {email}, have a token",
    "token": "{token}"
}
```
### User Updating
#### PUT /api/users/:id
Request Data
```json
{
    "email": "",
    "first_name": "",
    "last_name": ""
}
```
Response Data
```json
{
    "message": "Updated Account",
    "accountID": "{id}"
}
```
### Adding User Image
#### POST /api/users/:id
Request Data - Needs to be form-data - key = file
```json
{
    "file": {file.jpg}
}
```
Response Data
```json
{
    "message": "Successfully added account image!"
}
```
### Fetching All Users
#### GET /api/users/
Response Data
```json
{
    "accounts": [
        {accounts}
    ]
}
```
### Fetching Specific User
#### GET /api/users/:id
Response Data
```json
{
    "accounts": [
        {account}
    ]
}
```
### Fetching Users based on First or Last name
#### GET /api/users/search/:string
Response Data
```json
{
    "accounts": [
        {account}
    ]
}
```
### Fetching Users based on Email
#### GET /api/users/email/:string
Response Data
```json
{
    "accounts": [
        {account}
    ]
}
```
### Deleting a User
#### DEL /api/users/:id
Response Data
```json
{
    "deleted": "{id}"
}
```

## Post Examples

#### POST /api/posts/
Request Data
```json
{
    "post_title": "",
    "author_id": "",
    "post_content": ""
}
```
Response Data
```json
{
    "post": {post}
}
```
### Adding Post Image
#### POST /api/post/:id
Request Data - Needs to be form-data - key = file
```json
{
    "file": {file.jpg}
}
```
Response Data
```json
{
    "message": "Successfully added post image!"
}
```
### User Updating
#### PUT /api/post/:id
Request Data
```json
{
    "post_title": "",
    "author_id": "",
    "post_content": ""
}
```
Response Data
```json
{
    "message": "Updated Post",
    "postID": "{id}"
}
```
### Fetching All Users
#### GET /api/posts/
Response Data
```json
{
    "posts": [
        {post}
    ]
}
```
### Fetching Specific Post
#### GET /api/posts/:id
Response Data
```json
{
    "posts": [
        {post}
    ]
}
```
### Fetching Posts based on Author
#### GET /api/users/author/:authorID
Response Data
```json
{
    "posts": [
        {post}
    ]
}
```
### Fetching Posts based on Title or Content
#### GET /api/posts/search/:string
Response Data
```json
{
    "psots": [
        {post}
    ]
}
```
### Deleting a Post
#### DEL /api/posts/:id
Response Data
```json
{
    "deleted": "{id}"
}
```