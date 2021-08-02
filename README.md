# Docs Editor
A Markdown editor for Docusaurus content using GitHub to commit any progress and allow contributers to create a pull request to the upstream repository without the need to know Markdown or GitHub.

[**LIVE PREVIEW**](https://jlvandenhout.github.io/docusaurus-plugin-docs-editor)

## Usage
To be able to use this plugin you will need to set up GitHub authorization. To do this, set up a [GitHub OAuth App](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app) to let users authorize your app and a server that uses the Client Secret you got from GitHub during the app setup to swap a users authorization code for an access token (have a look at [Gatekeeper](https://github.com/prose/gatekeeper) for an easy setup).

Then add this plugin to your project:

```
yarn add jlvandenhout/docusaurus-plugin-docs-editor
```

And enable the plugin in your Docusaurus configuration and update the settings with the Client ID you got while setting up the GitHub OAuth App and the URL to your authorization endpoint:

```
module.exports = {
  ...
  plugins: [
    [
      '@jlvandenhout/docusaurus-plugin-docs-editor',
      {
        // The path to the docs section in your repository
        docsPath: 'docs',

        // GitHub OAuth Application settings
        github: {
          // The Client ID you got from the GitHub OAuth App setup
          clientId: '[CLIENT_ID]',
          // The plugin will append the authorization code to this URL
          tokenUrl: '[TOKEN_URL]'
        }
      }
    ]
  ]
};
```