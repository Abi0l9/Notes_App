# Notes App

This is a basic note API which allows users to perform CRUD operations with both registration and login features.

This API is built using NodeJS, Express and Mongoose backend technologies.

The project directory structure is as follows:

```
.
├── README.md
├── Requests
│   ├── login
│   ├── notes
│   ├── test.rest
│   └── users
├── app.js
├── controller
│   ├── login.js
│   ├── note.js
│   └── user.js
├── index.js
├── jest.config.js
├── models
│   ├── note.js
│   └── user.js
├── package-lock.json
├── package.json
├── tests
│   ├── crud.test.js
│   └── test_helper.js
└── utils
    ├── config.js
    └── middleware.js
```

## API REFERENCE

Base URL: This API can run locally on:  
 `http://localhost:3001`,  
and can also be accessed through the deployed url at:  
[https://rich-tan-sheep-hose.cyclic.app](https://rich-tan-sheep-hose.cyclic.app)

## Endpoints

### GET /

- General:

  - Curls the root path of the API

- Sample:

  - GET http://localhost:3001/

- Response:
  - `{"message": "Welcome to Notes App Homepage"}`

### POST /api/users

- General:

  - Registers a new user.

- Sample:

  ```
    POST http://localhost:3001/api/users
    Content-Type: application/json

    {
        "name":"user",
        "email":"user@gmail.com",
        "username":"user",
        "password":"test"
    }

  ```

- Response:
  ```
    {
  "name": "user",
  "email": "user@gmail.com",
  "username": "user",
  "notes": [],
  "id": "63f32ca92f613087ac92de4d"
    }
  ```

### POST /api/login

- General:

  - User logs in with registered credentials

- Sample:

  ```
    POST http://localhost:3001/api/login
    Content-Type: application/json

    {
        "username": "user",
        "password": "root"
    }

  ```

- Response:
  ```
    {
    "username": "user",
    "token": "JWTTOKEN"
    }
  ```

### POST /api/notes

- General:

  - Creates a new note

- Sample:

  ```
    POST http://localhost:3001/api/notes
    Content-Type: application/json
    Authorization: Bearer ${JWTTOKEN}

    {
        "title":"first note",
        "body":"Body of the first note"
    }

  ```

- Response:
  ```
    {
    "title": "first note",
    "date": "Mon, 20 Feb 2023 08:30:54 GMT",
    "user": "63f32ca92f613087ac92de4d",
    "id": "63f32fbe2f613087ac92de55"
    }
  ```

### GET /api/notes

- General:

  - Retrieves a list of all saved notes.

- Sample:

  ```
    GET http://localhost:3001/api/notes
    Authorization: Bearer ${JWTTOKEN}
  ```

- Response:
  ```
    [
        {
            "title": "first note",
            "date": "Mon, 20 Feb 2023 08:30:54 GMT",
            "user": {
            "name": "user",
            "id": "63f32ca92f613087ac92de4d"
            },
            "id": "63f32fbe2f613087ac92de55"
        }
    ]
  ```

### GET /api/notes/noteId

- General:

  - Retrieves a single note.

- Sample:

  ```
    GET http://localhost:3001/api/notes/63f32fbe2f613087ac92de55
    Authorization: Bearer ${JWTTOKEN}
  ```

- Response:
  ```
    [
        {
            "title": "first note",
            "date": "Mon, 20 Feb 2023 08:30:54 GMT",
            "user": {
            "name": "user",
            "id": "63f32ca92f613087ac92de4d"
            },
            "id": "63f32fbe2f613087ac92de55"
        }
    ]
  ```

### PATCH /api/notes/noteId

- General:

  - Edits a single note.

- Sample:

  ```
    PATCH http://localhost:3001/api/notes/63f32fbe2f613087ac92de55
    Authorization: Bearer ${JWTTOKEN}
    Content-Type: application/json

    {
        "title":"first edited title",
        "body":"edited body too"
    }
  ```

- Response:
  ```
    {
    "message": "Edited Successfully"
    }
  ```

### DELETE /api/notes/noteId

- General:

  - Deletes a single note.

- Sample:

  ```
    DELETE http://localhost:3001/api/notes/63f32fbe2f613087ac92de55
    Authorization: Bearer ${JWTTOKEN}
  ```

- Response:
  ```
    {
    "message": "Deleted Successfully"
    }
  ```
- deployed at: https://rich-tan-sheep-hose.cyclic.app/
#### N.B: Apart from register and login routes, other routes require JWT token that is returned when the user logged in.
Tests can be found in `./tests` directory.
