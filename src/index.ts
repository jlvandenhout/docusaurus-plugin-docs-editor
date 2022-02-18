import path from 'path';
import { LoadContext, Plugin } from '@docusaurus/types';
import { EditorOptions } from '@theme/Editor';

function pluginDocsEditor(
  context: LoadContext,
  options: EditorOptions,
): Plugin<void> {
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
      return path.resolve(__dirname, './theme');
    },
    async contentLoaded({ actions }) {
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
}

export default pluginDocsEditor;
