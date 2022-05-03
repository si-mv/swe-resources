# Securing APIs with Basic Auth

## Assignment: MeMo

You wil build an app called MeMo.

Create two npm projects, one in a directory called `client` and another in `server`. The server should have an array of `users: []` and an array of `memos: []` which mock a database. You will build an api for the users to interact with these arrays.

### User story

As a user:
- [ ] I can create an account with a `username` and `password`.
- [ ] when I create an account, the server assigns me a `uid`.
- [ ] when I create an account, the server salts and hashes my `password`.
- [ ] I can change my `username`.
- [ ] I can change my `password`.
- [ ] I can create a `memo` object which contains a `string` representing my memo's `content`.
- [ ] I can delete my own memos, but no other user can.
- [ ] I can read my own memos.
- [ ] I can add `readers` to my memos who have read-only access. Only I and my `readers` can read my memos, nobody else.
- [ ] I can remove `readers` from my memos.
- [ ] I can delete my account, and all data associated with my account will be deleted too.

| As a... | I can... | so that... |
| :---: | --- | --- |
| user | create an account with a `username` and `password` | I can sign in securely |
| user | be assigned an `uid` by the server when I create an account | I can be identified uniquely |
| user | have my password salted and hashed on the server | I won't get hacked

### Hints

 - You could use (nanoid)[https://www.npmjs.com/package/nanoid] for creating `uid`s on the server.
 - When the user is created, the password should be salted and hashed and stored in the `users` array. You should use [bcrypt](https://www.npmjs.com/package/bcrypt) for hashing.
