import path from 'path';
import URI from 'urijs';
import { LoadContext, Plugin } from '@docusaurus/types';
import { EditorOptions } from '@theme/Editor';

function pluginDocsEditor(
  context: LoadContext,
  options: EditorOptions,
): Plugin<void> {
  const { baseUrl } = context;
  const { route = 'edit' } = options;
  const basePath = URI.joinPaths(baseUrl, route).toString();

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
        basePath,
      });
    },
  };
}

export default pluginDocsEditor;
