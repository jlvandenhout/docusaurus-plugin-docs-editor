# Docs Editor

This plugin adds a client-side text editor to your Docusaurus application, allowing users to propose changes to any of your Markdown files without the need to know Markdown or GitHub. It uses the GitHub API to fork your content repository for the user, commit any progress and create pull requests to the upstream repository.

| ⚠️ This project is a work in progress ⚠️                                                                                                                                                                               |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Some functionality is either not implemented or needs fixing. Please have a look at [open issues](https://github.com/jlvandenhout/docusaurus-plugin-docs-editor/issues) to join discussions and see what needs fixing. |

[**LIVE PREVIEW**](https://jlvandenhout.github.io/docusaurus-plugin-docs-editor)

## Usage

This plugin uses the GitHub OAuth [web application flow](https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps#web-application-flow) to get authorization from the user to interact with GitHub on behalf of the user.

To enable GitHub authorization:

- Set up a [GitHub OAuth app](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app) and note down the **client ID** and **client secret**.
- Set up an authorization server that swaps a users authorization code for an access token using the client secret. Have a look at [Gatekeeper](https://github.com/prose/gatekeeper) for an easy authorization server setup.

Then add this plugin to your Docusaurus project:

```
yarn add @jlvandenhout/docusaurus-plugin-docs-editor
```

Enable the plugin in your Docusaurus configuration and update the settings with the client ID and the URL to your authorization server (see [configuration](#configuration) for further options):

```js
module.exports = {
  ...
  plugins: [
    [
      '@jlvandenhout/docusaurus-plugin-docs-editor',
      {
        authorizationClientId: '99999999999',
        authorizationTokenUrl: 'http://localhost:9999/authorization/',
      },
    ],
  ],
};
```

After building your Docusaurus application, you should now find the link to edit a page right next to where you would normally find the link to GitHub in all your Markdown generated pages!

## Configuration

| Option                | Required | Explanation                                                               |
| --------------------- | :------: | ------------------------------------------------------------------------- |
| authorizationClientId |    x     | The client ID of the GitHub OAuth app.                                    |
| authorizationTokenUrl |    x     | The URL to your authorization server endpoint.                            |
| authorizationMethod   |          | The request method to use (GET or POST). Defaults to 'GET'.               |
| contentOwner          |          | The owner of the repository. Defaults to `siteConfig.organizationName`.   |
| contentRepo           |          | The name of the repository. Defaults to `siteConfig.projectName`.         |
| contentDocsPath       |          | The path to the documentation in the repository. Defaults to 'docs'.      |
| contentStaticPath     |          | The path to the static directory in the repository. Defaults to 'static'. |
| editorPath            |          | The editor endpoint. Defaults to 'edit'.                                  |

## Local testing

This repository provides a `preview` directory containing the [live preview](https://github.com/jlvandenhout/docusaurus-plugin-docs-editor-preview) repository and [Gatekeeper](https://github.com/prose/gatekeeper) repository as submodules. They are configured using environment variables or an `.env` file (see the [`.env.example`](.env.example) file). You will still need to set up a GitHub OAuth app yourself using `http://localhost` as authorization callback URL.

For a local setup, first clone this repository including submodules:

```
git clone --recurse-submodules https://github.com/jlvandenhout/docusaurus-plugin-docs-editor.git
cd docusaurus-plugin-docs-editor
```

Then copy the `.env.example` file to `.env` and update the `OAUTH_CLIENT_ID` and `OAUTH_CLIENT_SECRET` with the values of your GitHub OAuth app.

Now you can install all dependencies and start both the website and the authorization server by doing:

```
yarn install
yarn start
```

This will:

- Build the plugin.
- Configure both the website and the authorization server with the environment variables from the `.env` file.
- Start watching for any changes to the plugin or website source code.
- Automatically rebuild any changes.
