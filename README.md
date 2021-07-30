# Docs Editor
A Markdown editor for Docusaurus content using GitHub to commit any progress and allow contributers to create a pull request to the upstream repository without the need to know Markdown or GitHub.

**WORK IN PROGRESS: This project is in early development so expect functionality to be broken!**

## Usage
Add this plugin to your project:

```
yarn add jlvandenhout/docusaurus-plugin-docs-editor
```

Then enable the plugin in your Docusaurus configuration:

```
module.exports = {
  ...
  plugins: [
    [
      '@jlvandenhout/docusaurus-plugin-docs-editor',
      {
        // The path to the docs section in your repository
        docsPath: 'example/docs',

        // GitHub OAuth Application settings
        github: {
          clientId: '[GITHUB_CLIENT_ID]',
          tokenUrl: '[GITHUB_TOKEN_URI]'
        }
      }
    ]
  ]
};
```

## Example
To run the example webpage, you will need to set up a [GitHub OAuth App](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app) to let users authorize your app and a server that manages your Client Secret and allows users to swap their authorization code for an access token (have a look at [Gatekeeper](https://github.com/prose/gatekeeper) how to do that).

Then navigate to the example directory and start the development server with the `CLIENT_ID` and `TOKEN_URL` environment variables set to the Client ID you received from GitHub and the URL to your authorization server:

```
cd example
CLIENT_ID=12345 TOKEN_URL=http://example.com yarn start
```
