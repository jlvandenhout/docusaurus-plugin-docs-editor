# Docs Editor
A Markdown editor for Docusaurus content.

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