// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const path = require('path');

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = function pluginDocsEditor(context: any, options: any) {
  let { baseUrl } = context;
  if (baseUrl.startsWith('/')) {
    baseUrl = baseUrl.slice(1);
  }
  if (baseUrl.endsWith('/')) {
    baseUrl = baseUrl.slice(0, -1);
  }

  let route = options.route || 'edit';
  if (route.startsWith('/')) {
    route = route.slice(1);
  }
  if (route.endsWith('/')) {
    route = route.slice(0, -1);
  }

  const basePath = baseUrl === '' ? `/${route}` : `/${baseUrl}/${route}`;

  return {
    name: 'docusaurus-plugin-docs-editor',
    getThemePath() {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__dirname'.
      return path.resolve(__dirname, './theme');
    },
    async contentLoaded({
      actions
    }: any) {
      const { createData, setGlobalData, addRoute } = actions;

      const optionsPath = await createData(
        'editor.json',
        JSON.stringify(options),
      );

      addRoute({
        path: basePath,
        exact: false,
        component: '@theme/Editor',
        modules: {
          options: optionsPath,
        },
      });

      setGlobalData({
        route,
      });
    },
  };
};
