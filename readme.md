# Description

This is a small application that simulates some banking features, such as creating users, accounts, transactions between accounts...

It implements some simple securization measures like authenticating users via json web tokens.

## Routes
- users
    - POST (body: firstName, lastName, age)
    - POST /login
    - GET - get all users
    - PUT/:_id (body: name)
    - DELETE/:_id - deletes user
- accounts
    - POST (body: user _id) - creates new user
    - GET - get user's accounts
    - PUT/:_id (body: funds)
    - DELETE/:_id - deletes account
- transactions
    - POST (body: sender bank account _id, receiver bank account _id, amount) - creates new transaction
    - GET - get user's transactions
    - GET /bank
    - DELETE - deletes transaction
- connections
    - POST (body: receiver bank number) - creates new connection with status pending
    - GET - get connections
    - GET/list - gets user's contacts details
    - PUT/:_id/confirm (param: connection _id) 
    - DELETE/:_id - deletes connection

## Keep in mind
- Only user creation and login are allowed without a token. Remember to use the token provided by the **login** response in your subsequent requests.
- The only exception is checking the bank result, via _/transactions/bank_
- Respect the routes description when providing body or params.
- Pay attention to the possible errors, a description will appear.
## How to start the application
- Install all the dependencies with
```bash
$ npm install 
```

- Run the application with 
```bash
$ npm run start:dev
```
## Using the application
- You must register a new user or log in to the app with an existing one.
- Bear in mind that you will be provided a token valid for 15 minutes only
- For such time you'll be now granted access to the other routes. After expiration, you will need to log in again, obtaining a new token.

### Author
Adrián Mohmed Sanz, backend javascript developer.
