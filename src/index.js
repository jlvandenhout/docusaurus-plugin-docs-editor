const path = require('path')

module.exports = function pluginDocsEditor(context, options) {
  let { baseUrl } = context

  let route = options.route || 'edit'
  if (route.startsWith('/')) {
    route = route.slice(1)
  }

  return {
    name: 'docusaurus-plugin-docs-editor',
    getThemePath() {
      return path.resolve(__dirname, './theme')
    },
    async contentLoaded({ actions }) {

      const { createData, setGlobalData, addRoute } = actions

      const optionsPath = await createData(
        'editor.json',
        JSON.stringify(options),
      );

      addRoute({
        path: `${baseUrl}${route}`,
        exact: false,
        component: '@theme/Editor',
        modules: {
          options: optionsPath,
        },
      })

      setGlobalData({
        route
      })
    },
  }
}