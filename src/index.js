const path = require('path')

module.exports = function pluginDocsEditor(context, options) {
  const { baseUrl } = context

  return {
    name: 'docusaurus-plugin-docs-editor',
    getThemePath() {
      return path.resolve(__dirname, './theme')
    },
    async contentLoaded({ actions }) {
      const { createData, addRoute } = actions

      const optionsPath = await createData(
        'editor.json',
        JSON.stringify(options),
      );

      addRoute({
        path: baseUrl + 'edit',
        exact: false,
        component: '@theme/Editor',
        modules: {
          options: optionsPath,
        },
      })
    },
  }
}