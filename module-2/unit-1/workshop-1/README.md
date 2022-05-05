# REST APIs

- REST = Representational State Transfer
- REST is an *architectural style* which emphasises interacting with data with http requests to url endpoints
- API = Application Programming Interface - it's a way of interacting with an app with code
- The four main http methods which roughly correspond to CRUD are GET (read), POST (create), PUT (update), DELETE (delete)
- The most common status codes are

| Code | Meaning |
| :---: | --- |
| 200 | Success |
| 201 | Created successfuly |
| 400 | Invalid request |
| 401 | Failed to authenticate |
| 403 | Action is forbidden to this user |
| 404 | Resource not found |
| 500 | Internal server error |
| 503 | Service unavailable |

- REST API endpoints should be nouns not verbs, and should be consistent. `getImage?id=a6r7p` is bad; `GET images/a6r7p` is good.

## Assignment :Bleeter 🐑

We will create **Bleeter** - an app where users can post messages up to 140 characters in length!

To begin with, we will just have two arrays on the server where we will store users and bleets: `const users = []` and `const bleets = []`. If we want to persist data later we can use a library for that.

### User story 1

**Copy this table into the readme of your group's root folder.**

Replace `:white_large_square:` with `:white_check_mark:` when you have completed each row.

For each action the user takes, we should first verify their password. For now, we will store their password as plain text. This is bad practice and we'll fix it when we study basic auth later.

| As a... | I can... | so that... | Status |
| :---: | --- | --- | :---: |
| user | create an account with a `username` and `password` | I can sign in securely | :white_large_square: |
| user | edit my name and password | I control my identity and keep my account secure | :white_large_square: |
| user | create a bleet with a message, timestamp and author | I can influence people online | :white_large_square: |
| user | edit my own bleets | I cover my tracks when I get called out | :white_large_square: |
| user | delete my own bleets | I hide from the consequences of my own actions | :white_large_square: |
| user | delete my account and all associated data | I exercise my GDPR right to be forgotten | :white_large_square: |

### Extension: Liked bleets

Add some additional functionality around *liking* bleets:  

| As a... | I can... | so that... | Status |
| :---: | --- | --- | :---: |
| user | mark a bleet as *liked* | I keep track of my favourite bleets | :white_large_square: |
| user | unlike a bleet | I curate my list of liked bleets | :white_large_square: |
| user | see which users have liked my bleets | I can feel good about my posts | :white_large_square: |
| user | get a list of all the bleets I like | I enjoy them again | :white_large_square: |

### Extension: Refactoring

1. Look up how to use *routing* in express so that the api endpoints can be moved to their own files. You can make a directory called `api` and logically separate operations on the `users` and `bleets` into their own separate files.

1. Look up how to use *middleware* in express, and use it to improve the authentication workflow. You should be able to extract the `req.body.password == user.password` check and its associated logic into a single function, and then inject it as middleware wherever it is required.

### Further reading

You can find tutorials for building REST APIs in various frameworks on [Pluralsight](https://www.pluralsight.com/).

 - For Node there is [Express](https://www.pluralsight.com/courses/node-js-express-rest-web-services-update)
 - For Java there is [Spring Boot](https://www.pluralsight.com/courses/creating-first-spring-boot-application)
 - For Python there is [Flask](https://www.pluralsight.com/courses/python-flask-rest-api)

Take a look at one of these courses to learn more about developing REST APIs in your chosen language.
