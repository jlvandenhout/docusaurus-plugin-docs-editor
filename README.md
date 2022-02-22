# Docs Editor

A Markdown editor for Docusaurus content using GitHub to commit any progress and allow contributors to create a pull request to the upstream repository without the need to know Markdown or GitHub.

| ⚠️ This project is a work in progress ⚠️                                                                                                                                                                               |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Some functionality is either not implemented or needs fixing. Please have a look at [open issues](https://github.com/jlvandenhout/docusaurus-plugin-docs-editor/issues) to join discussions and see what needs fixing. |

[**LIVE PREVIEW**](https://jlvandenhout.github.io/docusaurus-plugin-docs-editor)

## Usage

This plugin requires GitHub OAuth authorization to interact with GitHub on behalf of the user. To enable GitHub authorization:

- Set up a [GitHub OAuth app](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app) to let users authorize your application.
- Set up a server that swaps a users authorization code for an access token using a client secret of your GitHub OAuth app. Have a look at [Gatekeeper](https://github.com/prose/gatekeeper) for an easy authorization server setup.

Then add this plugin to your Docusaurus project:

```
yarn add @jlvandenhout/docusaurus-plugin-docs-editor
```

Enable the plugin in your Docusaurus configuration and update the settings with the **client ID** of the GitHub OAuth app and the URL to your authorization endpoint:

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
