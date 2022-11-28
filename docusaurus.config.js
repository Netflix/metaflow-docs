// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

// produced by redirect-config.py based on redirect-urls.csv
const REDIRECTS = [{"to": "/production/coordinating-larger-metaflow-projects", "from": "/going-to-production-with-metaflow/coordinating-larger-metaflow-projects"}, {"to": "/production/introduction", "from": "/going-to-production-with-metaflow/scheduling-metaflow-flows"}, {"to": "/production/scheduling-metaflow-flows/scheduling-with-argo-workflows", "from": "/going-to-production-with-metaflow/scheduling-metaflow-flows/scheduling-with-argo-workflows"}, {"to": "/production/scheduling-metaflow-flows/scheduling-with-aws-step-functions", "from": "/going-to-production-with-metaflow/scheduling-metaflow-flows/scheduling-with-aws-step-functions"}, {"to": "/internals/technical-overview", "from": "/internals-of-metaflow/technical-overview"}, {"to": "/internals/testing-philosophy", "from": "/internals-of-metaflow/testing-philosophy"}, {"to": "/internals/contributing", "from": "/introduction/contributing-to-metaflow"}, {"to": "/introduction/metaflow-resources", "from": "/introduction/getting-in-touch"}, {"to": "/internals/release-notes", "from": "/introduction/release-notes"}, {"to": "/introduction/metaflow-resources", "from": "/introduction/roadmap"}, {"to": "/getting-started/infrastructure", "from": "/metaflow-on-aws"}, {"to": "/getting-started/infrastructure", "from": "/metaflow-on-aws/deploy-to-aws"}, {"to": "/getting-started/infrastructure", "from": "/metaflow-on-aws/metaflow-sandbox"}, {"to": "/scaling/data", "from": "/metaflow/data"}, {"to": "/scaling/dependencies", "from": "/metaflow/dependencies"}, {"to": "/scaling/failures", "from": "/metaflow/failures"}, {"to": "/scaling/introduction", "from": "/metaflow/scaling-out-and-up"}, {"to": "/scaling/introduction", "from": "/metaflow/scaling-out-and-up/effortless-scaling-with-aws-batch"}, {"to": "/scaling/introduction", "from": "/metaflow/scaling-out-and-up/effortless-scaling-with-kubernetes"}, {"to": "/scaling/tagging", "from": "/metaflow/tagging"}]

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Metaflow Docs",
  url: "https://docs.metaflow.org",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "Netflix", // Usually your GitHub org/username.
  projectName: "metaflow-docs", // Usually your repo name.
  trailingSlash: false,

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: REDIRECTS
      }
    ]
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          // remarkPlugins: [[remarkCodeHike, { theme }]],
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.dev/Netflix/metaflow-docs/blob/master",
          routeBasePath: "/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "G-EYFXNGNGB6",
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
          src: "img/Metaflow_Logo_Horizontal_OneColor_DarkBlue_RGB.svg",
          href: "/",
          height: 30,
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
        hideOnScroll: true,
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true
        }
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
