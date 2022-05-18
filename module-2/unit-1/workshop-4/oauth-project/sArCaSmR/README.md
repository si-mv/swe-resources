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

If you get to the point where GitHub is responding with a code, you're ready to switch to the backend.

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
