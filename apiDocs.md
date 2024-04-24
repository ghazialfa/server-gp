# Chatify

## Endpoints

List of available endpoints:

- `POST` /signup
- `POST` /login
- `POST` /messages/:id
- `GET` /messages/:id
- `GET` /users

## 1. `POST` signup

- body

```json
{
  "fullName": "John Doe",
  "username": "John",
  "password": "tester123",
  "confirmPassword": "tester123",
  "gender": "male"
}
```

_response (200 - ok)_

```json
{
  "_id": "662794dc7a8a16edaa7680f6",
  "fullName": "John Doe",
  "username": "John",
  "profilePic": "https://avatar.iran.liara.run/public/boy?username=John"
}
```

_response(400 - Bad request)_

```json
{
    "message": "Passwords and confirm password does not match"
}
OR
{
    "message": "Username cannot be empty"
}
OR
{
    "message": "Password cannot be empty"
}
OR
{
    "message": "Username already exist"
}
```

## 2. `POST` login

- body

```json
{
  "username": "John",
  "password": "tester123"
}
```

_response (200 - ok)_

```json
{
    "_id": "662794dc7a8a16edaa7680f6",
    "fullName": "John Doe",
    "username": "John",
    "profilePic": "https://avatar.iran.liara.run/public/boy?username=John",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjI3OTRkYzdhOGExNmVkYWE3NjgwZjYiLCJpYXQiOjE3MTM5MzUzMTUsImV4cCI6MTcxNTIzMTMxNX0.dYYHJ7u7y05GFSma3HxUZJlWi1S-qgIYgVIrE4iBcxo"
}
```

_response(400 - Bad request)_

```json
{
    "message": "Invalid username or password"
}
OR
{
    "message": "Invalid username or password"
}
```

## 3. `POST` messages/:id
- headers
```json
{
    "authorization": "Bearer <token>"
}
```

- params

```json
{
  "id": "string"
}
```

- body

```json
{
  "messages": "hai kevin"
}
```

_response (201 - created)_

```json
{
  "newMessage": {
    "SenderId": "6627982779891e5bde1b49d3",
    "ReceiverId": "6627c0f597a138f7c8fe8b1b",
    "messages": "hai kevin",
    "_id": "6627d63a26d7b047c5949ff6",
    "createdAt": "2024-04-23T15:39:38.453Z",
    "updatedAt": "2024-04-23T15:39:38.453Z",
    "__v": 0
  }
}
```
_response (401 - Unauthorized )_

```json
{ "message": "Error authentication" }
```

## 4. `GET` messages/:id
- headers
```json
{
    "authorization": "Bearer <token>"
}
```

- params

```json
{
  "id": "string"
}
```

_response (200 - ok)_

```json
[
    {
        "_id": "6627cf3584629e232be588e8",
        "SenderId": "6627982779891e5bde1b49d3",
        "ReceiverId": "6627c0f597a138f7c8fe8b1b",
        "messages": "hai kevin",
        "createdAt": "2024-04-23T15:09:41.390Z",
        "updatedAt": "2024-04-23T15:09:41.390Z",
        "__v": 0
    },...
]
```
_response (401 - Unauthorized )_

```json
{ "message": "Error authentication" }
```
## 5. `GET` users

- headers
```json
{
    "authorization": "Bearer <token>"
}
```
_response (200 - ok)_

```json
[
    {
        "_id": "662785611bc07dd297e16469",
        "fullName": "Nathaniel Kevin",
        "username": "Kevin",
        "gender": "male",
        "profilePic": "https://avatar.iran.liara.run/public/boy?username=Kevin",
        "createdAt": "2024-04-23T09:54:42.092Z",
        "updatedAt": "2024-04-23T09:54:42.092Z",
        "__v": 0
    }
]
```
_response (401 - Unauthorized )_

```json
{ "message": "Error authentication" }
```

## Global Error

_Response (500 - Internal Server Error)_

```JSON
{
    "message": "Internal server error"
}
```