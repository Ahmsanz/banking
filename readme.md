# Description

This is a small application that simulates some banking features, such as creating users, accounts, transactions between accounts...

It implements some simple securization measures like authenticating users via json web tokens.

## Routes
- users
    - POST
    - POST /login
    - GET
    - PUT (name)
    - DELETE
- accounts
    - POST
    - GET
    - PUT (funds)
    - DELETE
- transactions
    - POST
    - GET
    - GET /bank
    - DELETE
- connections
    - POST
    - GET
    - PUT (name)
    - DELETE

## Keep in mind
- Only user creation and login are allowed without a token. Remember to use the token provided by the **login** response in your subsequent requests.
- The only exception is checking the bank result, via _/transactions/bank_

## How to start the application
- Install all the dependencies with
```bash
$npm install 
```

- Run the application with 
```bash
$npm run start:dev
```

### Author
Adrián Mohmed Sanz, backend developer.
