import path from 'path';
import { LoadContext, Plugin } from '@docusaurus/types';
import { EditorOptions } from '@theme/Editor';

function pluginDocsEditor(
  context: LoadContext,
  options: EditorOptions,
): Plugin<void> {
  let { baseUrl } = context;
  baseUrl = baseUrl.replace(/^\/*|\/*$/g, '');

  let { route = 'edit' } = options;
  route = route.replace(/^\/*|\/*$/g, '');

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
