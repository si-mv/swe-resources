# Securing APIs with Basic Auth

Objectives:
- Know the difference between authentication and authorization
- Understand how a username and password is sent using Basic Authentication
- Secure an API using Basic Authentication

## Notes

-   **Authentication** is the process of verifying that a user is who they say they are. **Authorization** is the process of verifying that the authenticated user has *permission* to carry out an action.

-   Under Basic Authentication, the username and password are sent as a HTTP header in the following format:
    ```
    Basic bXIucG9wbzpMbGFtYUZhcm1hOTU=
    ```
    where `bXIucG9wbzpMbGFtYUZhcm1hOTU=` is the Base 64 encoding of `username:password`.

    If you want to manually encode to Base 64, open the dev tools console in your browser and type
    ```js
    btoa('hello world')
    ```
    and to decode back to a string you can
    ```js
    atob('aGVsbG8gd29ybGQ=')
    ```

-   On the server, passwords should be salted and hashed. A salt is a string of random characters which is added to the password, and a hash is a function which takes the salted password and disguises it. The hash function will always give the same output given the same input (i.e. it is not random), but it is almost impossible to reverse the function. It is easy to hash a password, but almost impossible to unhash it.

- You should `npm i bcrypt` to provide the hashing. The [bcrypt docs](https://www.npmjs.com/package/bcrypt) will explain how to use it - you should use the async style further down the document. To use bcrypt manually, you can enter an interactive node session by typing `node` in the terminal, and then do
```js
require('bcrypt').hashSync('myp4ssw0rd', 10)
```
and so on.

## Assignment

Copy your Bleeter project into the `workshop-2` directory.

Refactor your Bleeter code to make use of password hashing with bcrypt.

### Extension 1: User roles

Allow certain users to be admins.

| As a... | I can... | so that... |
| :---: | --- | --- |
| admin | CRUD any user | I can control my users, and reset passwords if needed |
| admin | CRUD any bleet | I can damage control my platform's reputation |

You can implement this however you please, but it's a good idea to use middleware to check if a user is admin or not rather than coding the check into each endpoint.

### Extension 2: Payment details

Allow users to add their payment details to their profile. Admins cannot CRUD payment details!
