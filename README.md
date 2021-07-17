# Docs Editor
A Markdown editor for Docusaurus content.

**WORK IN PROGRESS: This project is in early development so expect functionality to be broken!**

## Usage
Add this plugin to your project:

```
yarn add jlvandenhout/docusaurus-plugin-docs-editor
```

Then add enable the plugin in your Docusaurus configuration:

```
module.exports = {
  ...
  plugins: [
    [
      '@jlvandenhout/docusaurus-plugin-docs-editor',
      {
        path: 'docs' // The path to your docs folder in your project
      }
  ]
};
```
