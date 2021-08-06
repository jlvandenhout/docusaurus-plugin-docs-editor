const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Docs Editor',
  tagline: 'A Markdown editor for Docusaurus content',
  url: 'https://jlvandenhout.github.io',
  baseUrl: '/docusaurus-plugin-docs-editor/',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'jlvandenhout', // Usually your GitHub org/user name.
  projectName: 'docusaurus-plugin-docs-editor', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Docs Editor',
      logo: {
        alt: 'Docs Editor Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Tutorial',
        },
        {
          href: 'https://github.com/facebook/docusaurus',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} J.L. van den Hout. Built with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/jlvandenhout/docusaurus-plugin-docs-editor/edit/master/example/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/jlvandenhout/docusaurus-plugin-docs-editor/edit/master/example/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    [
      './..',
      {
        docs: {
          owner: 'jlvandenhout',
          repo: 'docusaurus-plugin-docs-editor-preview'
        },
        github: {
          clientId: process.env.CLIENT_ID,
          tokenUrl: process.env.TOKEN_URL,
        }
      }
    ]
  ]
};
