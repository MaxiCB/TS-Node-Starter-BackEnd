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
#### Table of Contents
**Auth**
|Type|Path|Notes|Example|
|--|--|--|--|
|POST|/api/auth/login|Login a User||
|POST|/api/auth/register|Register a new  User||

**Users**
|Type|Path|Notes|Example|
|--|--|--|--|
|PUT|/api/users/:id|Update a User||
|POST|/api/users/:id|Add a Image to a User||
|GET|/api/users/|Fetch all User's||
|GET|/api/users/:id|Fetch a User by ID||
|GET|/api/users/search/:string|Fetch a User by partial Name||
|GET|/api/users/email/:string|Fetch a User partial Email||
|DEL|/api/users/:id|Delete a User||

**Posts**
|Type|Path|Notes|Example|
|--|--|--|--|
|POST|/api/posts/|Add a Post||
|POST|/api/posts/:id|Add a Image to a Post||
|PUT|/api/posts/:id|Update a Post||
|GET|/api/posts/|Fetch all Post's||
|GET|/api/posts/:id|Fetch a Post by PostID||
|GET|/api/posts/author/:UserID|Fetch all posts by UserID||
|GET|/api/posts/search/:string|Fetch all posts by partial Title or Content||
|DEL|/api/posts/:id|Delete a Post||

**Analytics**
|Type|Path|Notes|Example|
|--|--|--|--|
|GET|/api/posts/|Fetch all Post's||
|GET|/api/posts/:id|Fetch a Post by ID||
|GET|/api/posts/:Userid|Fetch all posts by UserID||