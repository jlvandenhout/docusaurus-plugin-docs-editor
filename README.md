# Docs Editor
A Markdown editor for Docusaurus content.

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
          tokenUri: '[GITHUB_TOKEN_URI]'
        }
      }
    ]
  ]
};
```

## Example
To run the example webpage, navigate to the example directory, set the needed environment
variables or edit the plugin configuration and start the development server:

```
cd example
GITHUB_CLIENT_ID=123456789 GITHUB_TOKEN_URI=https://example.com yarn start
```