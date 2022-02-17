import React, { useEffect, useState } from 'react';

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'base... Remove this comment to see the full error message
import base64 from 'base-64';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'utf8... Remove this comment to see the full error message
import utf8 from 'utf8';

import clsx from 'clsx';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@docusaurus/useDocusaurusConte... Remove this comment to see the full error message
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@docusaurus/useBaseUrl' or its... Remove this comment to see the full error message
import useBaseUrl from '@docusaurus/useBaseUrl';

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'lowl... Remove this comment to see the full error message
import lowlight from 'lowlight/lib/core.js';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'high... Remove this comment to see the full error message
import c from 'highlight.js/lib/languages/c.js';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'high... Remove this comment to see the full error message
import javascript from 'highlight.js/lib/languages/javascript.js';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'high... Remove this comment to see the full error message
import markdown from 'highlight.js/lib/languages/markdown.js';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'high... Remove this comment to see the full error message
import python from 'highlight.js/lib/languages/python.js';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'high... Remove this comment to see the full error message
import rust from 'highlight.js/lib/languages/rust.js';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'high... Remove this comment to see the full error message
import shell from 'highlight.js/lib/languages/shell.js';

import { useEditor, ReactNodeViewRenderer } from '@tiptap/react';
import Blockquote from '@tiptap/extension-blockquote';
import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import Code from '@tiptap/extension-code';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Document from '@tiptap/extension-document';
import Dropcursor from '@tiptap/extension-dropcursor';
import HardBreak from '@tiptap/extension-hard-break';
import Heading from '@tiptap/extension-heading';
import History from '@tiptap/extension-history';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Image from '@tiptap/extension-image';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';

import { Octokit } from '@octokit/core';
import { restEndpointMethods } from '@octokit/plugin-rest-endpoint-methods';

import htmlStringify from 'rehype-stringify';
import htmlParse from 'rehype-parse';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'rehy... Remove this comment to see the full error message
import htmlParseUrl from 'rehype-urls';
import htmlToMarkdown from 'rehype-remark';
import markdownStringify from 'remark-stringify';
import markdownParse from 'remark-parse';
import markdownParseFrontmatter from 'remark-frontmatter';
import markdownUnwrapImages from 'remark-unwrap-images';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@pon... Remove this comment to see the full error message
import markdownAbsoluteImages from '@pondorasti/remark-img-links';
import markdownExtractFrontmatter from 'remark-extract-frontmatter';
import markdownToHtml from 'remark-rehype';
import unified from 'unified';
import yaml from 'yaml';

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@theme/EditorMenu' or its corr... Remove this comment to see the full error message
import EditorMenu from '@theme/EditorMenu';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@theme/EditorPage' or its corr... Remove this comment to see the full error message
import EditorPage from '@theme/EditorPage';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@theme/EditorLogin' or its cor... Remove this comment to see the full error message
import EditorLogin from '@theme/EditorLogin';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@theme/EditorCodeBlock' or its... Remove this comment to see the full error message
import EditorCodeBlock from '@theme/EditorCodeBlock';

import 'highlight.js/styles/github.css';
import './Editor.css';

lowlight.registerLanguage('c', c);
lowlight.registerLanguage('javascript', javascript);
lowlight.registerLanguage('markdown', markdown);
lowlight.registerLanguage('python', python);
lowlight.registerLanguage('rust', rust);
lowlight.registerLanguage('shell', shell);

export default function Editor({
  options,
  className
}: any) {
  const [announcement, setAnnouncement] = useState('');
  const [pullrequest, setPullrequest] = useState('');

  const [contentFrontmatter, setContentFrontmatter] = useState();
  const [contentBranch, setContentBranch] = useState();
  const [contentPath, setContentPath] = useState();

  const [github, setGithub] = useState();
  const [syncing, setSyncing] = useState(false);
  const [savedContent, setSavedContent] = useState('');
  const [currentContent, setCurrentContent] = useState('');
  const [dirty, setDirty] = useState(false);

  const context = useDocusaurusContext();
  const editorBasePath = useBaseUrl(options.route || 'edit');

  let docsOwner = context.siteConfig.organizationName;
  let docsRepo = context.siteConfig.projectName;
  let docsPath = 'docs';
  if (options.docs) {
    docsOwner = options.docs.owner || docsOwner;
    docsRepo = options.docs.repo || docsRepo;
    docsPath = options.docs.path || docsPath;
  }

  let staticPath = 'static';

  if (options.static) {
    staticPath = options.static.path || staticPath;
  }

  const authorizationCodeUrl = 'https://github.com/login/oauth/authorize';
  const authorizationScope = 'public_repo';
  const authorizationClientId = options.github.clientId;

  let authorizationTokenUrl = options.github.tokenUrl;
  if (authorizationTokenUrl && !authorizationTokenUrl.endsWith('/')) {
    authorizationTokenUrl += '/';
  }

  const authorizationMethod = options.github.method
    ? options.github.method.toUpperCase()
    : 'GET';
  if (!['GET', 'POST'].includes(authorizationMethod)) {
    throw 'Authorization request method must be GET or POST.';
  }

  const editor = useEditor({
    extensions: [
      Blockquote,
      Bold,
      BulletList,
      Code,
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(EditorCodeBlock);
        },
      }).configure({ lowlight }),
      Document,
      Dropcursor,
      HardBreak,
      Heading,
      History,
      HorizontalRule,
      Italic,
      Image,
      Link.configure({ openOnClick: false }),
      ListItem,
      OrderedList,
      Paragraph,
      Text,
    ],
    autofocus: 'start',
    onUpdate({ editor }) {
      setCurrentContent(editor.getHTML());
    },
  });

  const requestAuthorizationCode = (redirectUrl: any) => {
    const url = new URL(authorizationCodeUrl);

    const parameters = url.searchParams;
    parameters.append('client_id', authorizationClientId);
    parameters.append('scope', authorizationScope);
    parameters.append('redirect_uri', redirectUrl);

    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'URL' is not assignable to parame... Remove this comment to see the full error message
    window.location.replace(url);
  };

  const requestAuthorizationToken = async (code: any) => {
    if (authorizationMethod === 'GET') {
      const url = new URL(code, authorizationTokenUrl);

      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'URL' is not assignable to parame... Remove this comment to see the full error message
      return await fetch(url)
        .then((response) => response.json())
        .then((data) => data.token);
    } else if (authorizationMethod === 'POST') {
      return await fetch(authorizationTokenUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then((response) => response.json())
        .then((data) => data.token);
    } else {
      throw 'Authorization request method must be GET or POST.';
    }
  };

  const requestAuthorization = async () => {
    const url = new URL(window.location.pathname, window.location.origin);
    const parameters = new URLSearchParams(window.location.search);

    const code = parameters.get('code');

    if (code) {
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'URL' is not assignable to parame... Remove this comment to see the full error message
      window.history.replaceState(window.history.state, '', url);
      const token = await requestAuthorizationToken(code);

      const OctokitRest = Octokit.plugin(restEndpointMethods);
      const { hook, rest: api } = new OctokitRest({ auth: token });

      hook.error('request', async (error) => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'status' does not exist on type 'RequestE... Remove this comment to see the full error message
        if (error.status === 403) {
          await requestAuthorization();
        } else {
          throw error;
        }
      });

      const {
        data: { login: user },
      } = await api.users.getAuthenticated();

      return { api, user };
    } else {
      requestAuthorizationCode(url);
    }
  };

  const createRepo = async () => {
    const {
      data: {
        name: originRepo,
        owner: { login: originOwner },
      },
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    } = await github.api.repos.createFork({
      owner: docsOwner,
      repo: docsRepo,
    });

    return await new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        github.api.repos
          .get({
            owner: originOwner,
            repo: originRepo,
          })
          .then((repo: any) => {
            clearInterval(interval);
            resolve(repo);
          })
          .catch((error: any) => {
            if (error.status !== 404) {
              reject(error);
            }
          });
      }, 1000);
    });
  };

  const requestRepo = async (owner: any, repo: any) => {
    let response;

    try {
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      response = await github.api.repos.get({
        owner,
        repo,
      });
    } catch (error) {
      // TODO: Follow 301 response in case repo was renamed
      if (error.status === 404 && owner !== docsOwner) {
        response = await createRepo();
      } else {
        throw error;
      }
    }

    const {
      data: {
        name: originRepo,
        owner: { login: originOwner },
        parent: upstream,
      },
    } = response;

    // Sanity check to verify the repo is indeed a fork
    if (originOwner !== docsOwner) {
      if (upstream) {
        const {
          name: upstreamRepo,
          owner: { login: upstreamOwner },
        } = upstream;
        if (upstreamOwner !== docsOwner && upstreamRepo !== docsRepo) {
          throw `Repo is not a fork of ${docsOwner}/${docsRepo}`;
        }
      } else {
        throw `Repo is not a fork of ${docsOwner}/${docsRepo}`;
      }
    }

    return { owner: originOwner, repo: originRepo };
  };

  const createBranch = async (owner: any, repo: any, branch: any) => {
    const {
      data: { default_branch: contentDefaultBranch },
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    } = await github.api.repos.get({
      owner: docsOwner,
      repo: docsRepo,
    });

    const {
      data: {
        commit: { sha },
      },
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    } = await github.api.repos.getBranch({
      owner: docsOwner,
      repo: docsRepo,
      branch: contentDefaultBranch,
    });

    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    await github.api.git.createRef({
      owner,
      repo,
      sha,
      ref: `refs/heads/${branch}`,
    });
  };

  const requestBranch = async (owner: any, repo: any, branch: any) => {
    try {
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      await github.api.repos.getBranch({
        owner,
        repo,
        branch,
      });
    } catch (error) {
      // TODO: Follow 301 response in case branch was renamed
      if (error.status === 404) {
        await createBranch(owner, repo, branch);
      } else {
        throw error;
      }
    }

    return branch;
  };

  const requestContent = async (owner: any, repo: any, branch: any, path: any) => {
    // TODO: Allow user to create content on 404 response
    const {
      data: { content: data },
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    } = await github.api.repos.getContent({
      owner,
      repo,
      path,
      ref: `refs/heads/${branch}`,
    });

    const markdown = utf8.decode(base64.decode(data));

    const staticContentBaseUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${staticPath}/`;

    const markdownToHtmlProcessor = unified()
      .use(markdownParse)
      .use(markdownParseFrontmatter, ['yaml'])
      .use(markdownExtractFrontmatter, { yaml: yaml.parse, remove: true })
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      .use(markdownUnwrapImages)
      .use(markdownAbsoluteImages, { absolutePath: staticContentBaseUrl })
      .use(markdownToHtml)
      .use(htmlStringify);

    const { data: frontMatter, contents: html } =
      await markdownToHtmlProcessor.process(markdown);

    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message
    setContentFrontmatter(frontMatter);
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    editor.chain().setContent(html).focus('start').run();
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    setSavedContent(editor.getHTML());
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    setCurrentContent(editor.getHTML());
  };

  const requestCommit = async (owner: any, repo: any, branch: any, path: any) => {
    const staticContentBaseUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${staticPath}/`;
    const removeImageBaseUrl = (url: any) => {
      if (url.href.startsWith(staticContentBaseUrl)) {
        const relativePath = url.href.slice(staticContentBaseUrl.length);
        return `/${relativePath}`;
      }
    };

    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    const html = editor.getHTML();
    const htmlToMarkdownProcessor = unified()
      .use(htmlParse)
      .use(htmlParseUrl, removeImageBaseUrl)
      .use(htmlToMarkdown)
      .use(markdownStringify, {
        bullet: '-',
        rule: '-',
        listItemIndent: 'mixed',
      });

    let { contents: markdown } = await htmlToMarkdownProcessor.process(html);

    if (contentFrontmatter) {
      const frontmatter = yaml.stringify(contentFrontmatter);
      markdown = `---\n${frontmatter}---\n\n${markdown}`;
    }

    const data = base64.encode(utf8.encode(markdown));

    setSyncing(true);
    const {
      data: { sha },
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    } = await github.api.repos.getContent({
      owner,
      repo,
      path,
      ref: `refs/heads/${branch}`,
    });

    setAnnouncement('Saving changes...');
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    await github.api.repos.createOrUpdateFileContents({
      owner,
      repo,
      branch,
      path,
      sha,
      content: data,
      message: `Edit ${contentPath}`,
    });

    setSavedContent(html);

    setAnnouncement('Changes have been saved, syncing with GitHub...');
    await new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        github.api.repos
          .getContent({
            owner,
            repo,
            path,
            ref: `refs/heads/${branch}`,
          })
          .then((data: any) => {
            const {
              data: { sha: remoteSha },
            } = data;

            if (remoteSha != sha) {
              // Remote file is updated
              clearInterval(interval);
              setSyncing(false);
              setAnnouncement('Changes have been saved');
              // @ts-expect-error ts-migrate(2794) FIXME: Expected 1 arguments, but got 0. Did you forget to... Remove this comment to see the full error message
              resolve();
            }
          })
          .catch((error: any) => {
            if (error.status !== 404) {
              setSyncing(false);
              setAnnouncement('An error occured during sync');
              reject(error);
            }
          });
      }, 1000);
    });
  };

  const requestPull = async (owner: any, branch: any) => {
    const head = `${owner}:${branch}`;

    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    const { data: pulls } = await github.api.pulls.list({
      owner: docsOwner,
      repo: docsRepo,
      state: 'open',
      head,
    });

    // TODO: Allow user to update existing pull requests
    if (pulls.length) {
      setPullrequest(pulls[0].html_url);
      setAnnouncement('Changes already submitted');
    } else {
      setAnnouncement('Submitting changes...');
      const {
        data: { default_branch: contentDefaultBranch },
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      } = await github.api.repos.get({
        owner: docsOwner,
        repo: docsRepo,
      });

      // TODO: Allow user to write a pull request title and description
      const {
        data: { html_url },
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      } = await github.api.pulls.create({
        owner: docsOwner,
        repo: docsRepo,
        base: contentDefaultBranch,
        head,
        title: `Edit ${contentPath}`,
      });
      setPullrequest(html_url);
      setAnnouncement('Changes submitted');
    }
  };

  const init = async () => {
    const github = await requestAuthorization();

    const filePath = window.location.pathname
      .slice(editorBasePath.length)
      .replace(/\/$/, '');

    const contentPath = `${docsPath}${filePath}.md`;

    const contentBranch = `edit/${contentPath.replace(/[/.]/g, '-')}`;

    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ api: RestEndpointMethods; user... Remove this comment to see the full error message
    setGithub(github);
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
    setContentBranch(contentBranch);
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
    setContentPath(contentPath);
  };

  const open = async () => {
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    const { owner, repo } = await requestRepo(github.user, docsRepo);
    const branch = await requestBranch(owner, repo, contentBranch);
    await requestContent(owner, repo, branch, contentPath);
  };

  const save = async () => {
    if (dirty) {
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      const { owner, repo } = await requestRepo(github.user, docsRepo);
      const branch = await requestBranch(owner, repo, contentBranch);
      await requestCommit(owner, repo, branch, contentPath);
    }
  };

  const submit = async () => {
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    const { owner, repo } = await requestRepo(github.user, docsRepo);
    const branch = await requestBranch(owner, repo, contentBranch);
    if (dirty) {
      await requestCommit(owner, repo, branch, contentPath);
    }
    await requestPull(owner, branch);
  };

  useEffect(() => {
    document.documentElement.dataset.theme = 'light';
    setAnnouncement('Getting ready...');
    init();
    setAnnouncement('Ready to edit');
  }, []);

  useEffect(() => {
    if (github && contentBranch && contentPath) {
      open();
    }
  }, [github, contentBranch, contentPath]);

  useEffect(() => {
    setDirty(currentContent !== savedContent);
  }, [currentContent, savedContent]);

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      {github ? (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={clsx('editor', className)}>
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className='editor__announcements padding-horiz--md padding-vert--xs'>
            {announcement}
          </div>
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <EditorMenu
            editor={editor}
            save={save}
            submit={submit}
            dirty={dirty}
            syncing={syncing}
            pullrequest={pullrequest}
          />
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <EditorPage editor={editor} />
        </div>
      ) : (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <EditorLogin />
      )}
    </>
  );
}
