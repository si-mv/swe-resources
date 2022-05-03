# Securing APIs with Basic Auth

Objectives
- know the difference between authentication and authorization
- understand how a username and password is sent using Basic Authentication
- Secure an API using Basic Authentication

## Notes

**Authentication** is the process of verifying that a user is who they say they are.

**Authorization** is the process of verifying that the authenticated user has *permission* to carry out an action.

Under Basic Authentication, the username and password are sent as a HTTP header in the following format:
```
Basic bXIucG9wbzpMbGFtYUZhcm1hOTU=
```
where `bXIucG9wbzpMbGFtYUZhcm1hOTU=` is the Base 64 encoding of `username:password`.

If you want to manually encode to Base 64, open the dev tools console in your browser and type
```
btoa('hello world')
```
and to decode back to a string you can
```
atob('aGVsbG8gd29ybGQ=')
```

On the server, passwords should be salted and hashed. A salt is a string of random characters which is added to the password, and a hash is a function which takes the salted password and disguises it. The hash function will always give the same output given the same input (i.e. it is not random), but it is almost impossible to reverse the function. It is easy to hash a password, but almost impossible to unhash it.

## Assignment: MeMo

You wil build an app called MeMo.

Create two npm projects, one in a directory called `client` and another in `server`. The server should have an array of `users: []` and an array of `memos: []` which mock a database. In `server` you will build an api for the users to interact with these arrays; in `client` you will build functions and tests to interact with your api.

Make sure you use the correct request types (GET, POST, PUT, DELETE) and response codes when building your app.

### User story

For users...

| As a... | I can... | so that... | Status |
| :---: | --- | --- | :---: |
| user | create an account with a `username` and `password` | I can sign in securely | :white_check_mark: |
| user | be assigned an `uid` by the server when I create an account | I can be identified uniquely | :white_large_square: |
| user | have my password salted and hashed on the server | I won't get hacked | :white_large_square: |
| user | update my `username` and `password` | I can keep my details up to date and secured | :white_large_square: |
| user | create a `memo` object in the array of `memos` on the server | save a string of content and retrieve it later | :white_large_square: |
| user | delete my own memos, but no other user can | control my data | :white_large_square: |
| user | read my own memos | know what my memos are | :white_large_square: |
| user | add `readers` to my memos | give read-only access to other users | :white_large_square: |
| user | remove readers from my memos | control who accesses my data | :white_large_square: |
| user | delete my account with all of its associated data | exercise my right to be forgotten under the GDPR | :white_large_square: |

### Hints

 - You could use [nanoid](https://www.npmjs.com/package/nanoid) for creating `uid`s on the server.
 - When the user is created, the password should be salted and hashed and stored in the `users` array. You should use [bcrypt](https://www.npmjs.com/package/bcrypt) for hashing (scroll down to the section on async - this is the best way).

### Extension 1

Write tests for your code in Jest. You could use unit testing to make sure your individual functions work, integration testing to see how the client interacts with the server, or end-to-end testing to ensure the user journey works.

### Extension 2

Add user roles to your app. Implement an `admin` role which can CRUD any user or memo. Admins can make other users into admins.
