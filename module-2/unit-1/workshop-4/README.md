# Securing apps with OAuth2

## What is OAuth2?

OAuth2 is a workflow by which a user (know as the **resource owner**) can authorize a third party app (the **client app**) to access their protected resources hosted on a separate server (the **OAuth provider**).

Imagine you host your files with a company called *Cloudbox*. Then, you download an app called *sArCaSmR* which promises to go through your files and replace the text with sArCaSm cAsE. You obviously think this is a great idea. If Cloudbox offers OAuth, then you can enable sArCaSmR to do this without giving sArCaSmR your Cloudbox password! Instead, you obtain a token for sArCaSmR and they use that instead.

## OAuth2 Workflows

There are several different workflows. The most common are the **authorization code** workflow and the **implicit grant** workflow. The implicit grant workflow is used when the client app is serverless, and so the token is sent directly to the client app's frontend. This is simple but not secure.

The authorization code workflow is more complex but more secure, and uses server-to-server communication over https to keep everything safe.

![oatuhflow](./oauthflow.svg)