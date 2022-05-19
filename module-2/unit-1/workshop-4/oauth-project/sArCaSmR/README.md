# sArCaSmR

**sArCaSmR** is a web-app. It is a very important, groundbreaking app. It is able to connect to various servers through the OAuth Code Grant flow and replace the contents of a given file with **sArCaSm cAsE**.

## To do

### Register a new app with GitHub

- [ ] Register a [new app](https://github.com/settings/apps/new) with GitHub.
- [ ] The homepage url should be `localhost:3000` or whatever port you're using for your frontend.
- [ ] Make the callback uri `localhost:3000/auth/github/callback`.
- [ ] Save your client secret somewhere very safe, you can only view it once. (You can always make another if you lose it.)

:+1: Now we can start writing code.

### Make a "Connect with GitHub" button

- [ ] Create a frontend in any framework you like. (I'm using [Nuxt.js v2](https://nuxtjs.org/docs/get-started/installation) because it is awesome.)
- [ ] Make a "Connect with GitHub" button which begins the OAuth process.
- [ ] When the button is clicked, you should generate a random `state` string store it in localStorage.
- [ ] It should then redirect to the oauth/authorize endpoint specified in GitHub's [documentation for web application flow](https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps) with all the required params (actually, with GitHub the redirect uri is specified when you register the app so you can leave it out).
- [ ] Add 'gist' to the scope.

:+1: If your user is being redirected to an "authorize app" page with "This app and read and write gists" you're over the first hurdle.

### Handle the response

- [ ] Make the '/auth/github/callback' page in your app, which handles the response from the server.
- [ ] It should check the `state` against localStorage and reject if it doesn't match.
- [ ] It should then get the `code` and get ready to send it to sArCaSmR's server.

:+1: If you get to the point where GitHub is responding with a code, you're ready to switch to the backend.

### Set up sArCaSmR's server

- [ ] Set up a server (preferably express) and put your `CLIENT_ID` and `CLIENT_SECRET` in a `.env` file. (Read the docs for [dotenv](https://www.npmjs.com/package/dotenv) if you want a refresher on how it works).
- [ ] Remember you stored your client secret somewhere very safe? Once it's in your `.env` file, delete it from everywhere else and don't copy it again.
- [ ] Make an '/auth/github' endpoint in your server which accepts the `code` from sArCaSmR's frontend and attempts to exchange it for an auth token with GitHub. You will need to send the client id and client secret, as per GitHub's documentation.
- [ ] Get the auth token and res.send it to the frontend.

:+1: If you now have an auth token, you're on the home stretch!

### Use the auth token to get secrets

- [ ] Head back to your callback page in the frontend and accept the auth token from sArCaSmR's server.
- [ ] Store it in localStorage and then navigate the user to a page where they can interact with their secrets. (You might, for example, send them to '/github/gists' where they can view all of their private gists).

:+1: If you can view private gists... well done! You're an OAuth wizard :D

### Time for sArCaSmR to shine

- [ ] Allow the user to specify a gist id, and overwrite its contents with sarcasm case. An "undo" button would also be a good idea!

## Adding "Sign in with Google"

Google also provides OpenID Connect (OIDC). We can use this to allow members to sign in with Google. [This document](https://developers.google.com/identity/protocols/oauth2/openid-connect) from Google is especially helpful.

### Set up your app

- [ ] Head to the [Google developer console](https://console.cloud.google.com/projectselector2/apis/dashboard) page for APIs and services. Create a project for sArCaSmR.
- [ ] On the Google developer console, choose OAuth consent screen from the left and choose *External* users, then click *Create*.
- [ ] Fill out the information for 1. OAuth Consent Screen and move on to 2. Scopes.
- [ ] Click *Add or remove scopes* and go down to the bottom to *Manually add scopes*. Enter `openid profile email` and click *Update*.
- [ ] You will need to make a test user. If you have a gmail account, you could use that, otherwise you will need to make one [here](https://accounts.google.com/signup/v2/webcreateaccount?service=groups2&flowName=GlifWebSignIn&flowEntry=SignUp).
- [ ] Now you can click credentials and get your client id and client secret. Save these in the .env file of your server.

:+1: Your app is now registered and you're ready to build a hand-made sign in with google button!

### Implement OAuth2 with Google

- [ ] Just like we did with Github, set up your OAuth flow with Google. The docs for this are [here](https://developers.google.com/identity/protocols/oauth2/web-server#httprest). (N.b. be sure to switch to HTTP/REST mode if not already. We aren't using client libraries so skip this section.)
- [ ] Make a Login with Google button in sArCaSmR's frontend.
- [ ] Be sure to pass `encodeURIComponent('openid profile email')` in the scope and pass all the params required to Google's OAuth 2.0 endpoint. You will need to `encodeURI()` your redirect_uri.
- [ ] Build your `auth/google/callback` endpoint in the frontend.
- [ ] Pass this up to the server and handle the rest of the authorization code flow to get your tokens.

:+1: Your response from Google should contain an access_token (which we could use to access Google's APIs) and also an id_token. We use the id_token to authenticate the user, and then log them in.

### Handle the id_token

- [ ] Get the id_token from the response sent by Google. In order to verify it's authenticity, you can send it to Google's *introspection endpoint* https://oauth2.googleapis.com/tokeninfo?id_token=XYZ123 (Google will check that the jwt is genuine using the secret key that was used to sign the jwt, just like we did using `jwt.verify(token, secret_key)` in the previous workshops. The response from the introspection endpoint will be the *payload* of the jwt.
- [ ] Once you have the payload, you can add it to a `users` array which mocks sArCaSmR's database. One particularly useful property from the payload is the "sub" - this is the *subject id* and is a unique id for your user shared between you and Google.
- [ ] Borrow the `login` function from the middleware of Bleeter and use it to "log in" the user to sArCaSmR.

:+1: If you successfully validate the id_token, then the user has authenticated! If you generate a sArCaSmR access token, the user has logged in to sArCaSmR! Well done :)

Take a look at your `auth.js` middleware from your project in workshop-1. Google has essentially done the job of the `authenticate` middleware (checking username:password). You can now generate an access token for your user using the `login` middleware we developed last time.

(Note: the access token received through the call to Google is an access token for Google's resources, not sArCaSmR's. If the user has protected resources on sArCaSmR, then it is up to sArCaSmR devs to make and handle their own access tokens.)

### Update the UI

- [ ] Send back the user info and sArCaSmR access token to the frontend. If you want to access google resources you can also send back the google access token. Redirect the user away from the callback page and do something in the UI to make it clear the user has logged in (maybe 'Hi, {{firstName!}}') or a nice mdi-person icon.

## If you get to this point, great!

Here are a few options of things you might try next:
 - if you feel really interested in the crypto side of things, you can research how to verify the id_token locally (without the introspection endpoint) using the [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) library together with [jwks-rsa](https://github.com/auth0/node-jwks-rsa). Google's `.well-known` url can be found in their OIDC docs.
 - explore Google's vast api and try and build something interesting around it - you could sArCaSmIfY a google doc or anything else you feel like doing.
 - check out Spotify's OAuth api and build something around that - maybe sArCaSmR users would like to listen to some music whilst they add some attitude to their gists and docs?
 - have a look at Google's [identity platform](https://developers.google.com/identity/gsi/web) and try to add a sign in with Google button in the "official" way (using Google's libraries and their premade button)