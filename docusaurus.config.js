// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
// const { remarkCodeHike } = require("@code-hike/mdx");
// const theme = require("shiki/themes/monokai.json");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Metaflow Docs",
  url: "https://docs.metaflow.org",
  baseUrl: "/metaflow-docs/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "Netflix", // Usually your GitHub org/user name.
  projectName: "metaflow-docs", // Usually your repo name.
  trailingSlash: false,

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          // remarkPlugins: [[remarkCodeHike, { theme }]],
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.dev/obgibson/metaflow-docs/blob/master",
          routeBasePath: "/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/Metaflow_Logo_Vertical_FullColor_Ribbon_Dark_RGB.png",
      navbar: {
        logo: {
          alt: "Metaflow Logo",
          srcDark: "img/Metaflow_Logo_Horizontal_OneColor_White_RGB.svg",
          src: "img/Metaflow_Logo_Horizontal_OneColor_White_RGB.svg",
          href: "/",
          height: "64px",
        },
        items: [
          {
            type: "doc",
            position: "left",
            docId: "python/index",
            label: "Python Docs",
          },
          {
            type: "doc",
            position: "left",
            docId: "r/README",
            label: "R Docs",
          },
          {
            href: "https://admin-docs.metaflow.org/",
            position: "left",
            label: "Admin Docs",
          },
          {
            type: "search",
            position: "right",
          },
        ],
        hideOnScroll: true,
      },

      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      algolia: {
        // The application ID provided by Algolia
        appId: "5IZ8L9TJQL",

        // Public API key: it is safe to commit it
        apiKey: "4b3ee46f2775330b080e60404a1f5150",

        indexName: "metataflow",

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        externalUrlRegex: "external\\.com|domain\\.com",

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: "search",

        //... other Algolia params
      },
    }),
};

module.exports = config;
