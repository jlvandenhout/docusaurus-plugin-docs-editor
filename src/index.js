const path = require('path')

module.exports = function pluginDocsEditor(context, options) {
  return {
    name: 'docusaurus-plugin-docs-editor',
    getThemePath() {
      return path.resolve(__dirname, './theme')
    },
    getPathsToWatch() {
      const contentPath = path.resolve(context.siteDir, options.path ?? '')
      return [`${contentPath}/**/*.{js,jsx}`]
    },
    async contentLoaded({ actions }) {
      const { addRoute } = actions

      addRoute({
        path: '/edit',
        exact: false,
        component: '@theme/Editor',
      })
    },
  }
}