// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Metaflow Docs",
  url: "https://docs.metaflow.org",
  baseUrl: "/",
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
          editUrl: "https://github.dev/Netflix/metaflow-docs/blob/new-docs",
          routeBasePath: "/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        googleAnalytics: {
          trackingID: "UA-148913719-1",
          anonymizeIP: true,
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
            docId: "index",
            label: "Python Docs",
          },
          {
            type: "doc",
            position: "left",
            docId: "v/r/README",
            label: "R Docs",
          },
          {
            href: "https://outerbounds.com/docs/admin",
            position: "left",
            label: "Admin Docs",
          },
        ],
        hideOnScroll: false,
      },

      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      algolia: {
        // The application ID provided by Algolia
        appId: "5IZ8L9TJQL",

        // Public API key: it is safe to commit it
        apiKey: "246d8e1f6a4c455ba30172edcd0399d5",

        indexName: "metataflow",

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        externalUrlRegex: "external\\.com|domain\\.com",

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: false,

        //... other Algolia params
      },
    }),
};

module.exports = config;
