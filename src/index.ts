import path from 'path';
import URI from 'urijs';
import { LoadContext, Plugin } from '@docusaurus/types';
import { EditorOptions } from '@theme/Editor';

function pluginDocsEditor(
  context: LoadContext,
  options: EditorOptions,
): Plugin<void> {
  const { siteConfig: {
    baseUrl,
    organizationName,
    projectName,
  }} = context;

  const defaultOptions = {
    authorizationMethod: 'GET',
    contentOwner: organizationName,
    contentRepo: projectName,
    contentDocsPath: 'docs',
    contentStaticPath: 'static',
    editorPath: 'edit',
  }
  
  const normalizedOptions = Object.assign({}, defaultOptions, options);
  const editorBasePath = URI.joinPaths(baseUrl, normalizedOptions.editorPath).toString();

  return {
    name: 'docusaurus-plugin-docs-editor',
    getThemePath() {
      return path.resolve(__dirname, './theme');
    },
    async contentLoaded({ actions }) {
      const { createData, setGlobalData, addRoute } = actions;

      const optionsPath = await createData(
        'editor.json',
        JSON.stringify(normalizedOptions),
      );

      addRoute({
        path: editorBasePath,
        exact: false,
        component: '@theme/Editor',
        modules: {
          options: optionsPath,
        },
      });

      setGlobalData({
        editorBasePath,
      });
    },
  };
}

export default pluginDocsEditor;
