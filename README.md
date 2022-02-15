# Docs Editor
A Markdown editor for Docusaurus content using GitHub to commit any progress and allow contributors to create a pull request to the upstream repository without the need to know Markdown or GitHub.

| ⚠️ This project is a work in progress ⚠️ |
| --- |
| Some functionality is either not implemented or needs fixing. Please have a look at [open issues](https://github.com/jlvandenhout/docusaurus-plugin-docs-editor/issues) to join discussions and see what needs fixing. |

[**LIVE PREVIEW**](https://jlvandenhout.github.io/docusaurus-plugin-docs-editor)

## Usage
This plugin requires GitHub OAuth authorization to interact with GitHub on behalf of the user. To enable GitHub authorization:

- Set up a [GitHub OAuth App](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app) to let users authorize your application.
- Set up a server that uses the Client Secret you got from GitHub during the app setup to swap a users authorization code for an access token (have a look at [Gatekeeper](https://github.com/prose/gatekeeper) for an easy setup).

Then add this plugin to your project:

```
yarn add @jlvandenhout/docusaurus-plugin-docs-editor
```

Enable the plugin in your Docusaurus configuration and update the settings with the Client ID you got while setting up the GitHub OAuth App and the URL to your authorization endpoint:

```
module.exports = {
  ...
  plugins: [
    [
      '@jlvandenhout/docusaurus-plugin-docs-editor',
      {
        // REQUIRED - The base route to the editor
        route: 'edit',
        docs: {
          // The username that owns the docs, defaults to siteConfig.organizationName
          owner: '',
          // The repository that contains the docs, defaults to siteConfig.projectName
          repo: '',
          // The path to the docs section in your repository
          path: 'docs',
        },
        static: {
          // The path to the static content section in your repository
          path: 'static',
        },


        // GitHub OAuth Application settings
        github: {
          // REQUIRED - The Client ID you got from the GitHub OAuth App setup
          clientId: '',
          // REQUIRED - The plugin will append the authorization code to this URL
          tokenUrl: '',
          // The request method to use (GET or POST), defaults to GET
          method: '',
        },
      }
    ]
  ]
};
```