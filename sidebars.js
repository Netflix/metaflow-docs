/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  python: [
    "python/index",
    {
      type: "category",
      label: "Introduction",
      collapsed: false,
      items: [
        "python/introduction/why-metaflow",
        "python/introduction/what-is-metaflow",
        "python/introduction/release-notes",
        "python/introduction/roadmap",
        "python/introduction/contributing-to-metaflow",
        "python/introduction/getting-in-touch",
      ],
    },
    {
      type: "category",
      label: "Getting Started",
      collapsed: false,
      items: [
        "python/getting-started/install",
        {
          type: "category",
          label: "Tutorials",
          collapsed: false,
          link: { type: "doc", id: "python/getting-started/tutorials/README" },
          items: [
            {
              type: "category",
              label: "Season 1: The Local Experience",
              link: {
                type: "doc",
                id: "python/getting-started/tutorials/season-1-the-local-experience/README",
              },
              collapsed: false,
              items: [
                "python/getting-started/tutorials/season-1-the-local-experience/episode00",
                "python/getting-started/tutorials/season-1-the-local-experience/episode01",
                "python/getting-started/tutorials/season-1-the-local-experience/episode02",
                "python/getting-started/tutorials/season-1-the-local-experience/episode03",
                "python/getting-started/tutorials/season-1-the-local-experience/episode04",
              ],
            },
            {
              type: "category",
              label: "Season 2: Scaling Out and Up",
              link: {
                type: "doc",
                id: "python/getting-started/tutorials/season-2-scaling-out-and-up/README",
              },
              collapsed: false,
              items: [
                "python/getting-started/tutorials/season-2-scaling-out-and-up/episode05",
                "python/getting-started/tutorials/season-2-scaling-out-and-up/episode06",
                "python/getting-started/tutorials/season-2-scaling-out-and-up/episode07",
                "python/getting-started/tutorials/season-2-scaling-out-and-up/episode-8-autopilot",
              ],
            },
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Metaflow on AWS",
      collapsed: false,
      items: [
        "python/metaflow-on-aws/metaflow-on-aws",
        "python/metaflow-on-aws/metaflow-sandbox",
        "python/metaflow-on-aws/deploy-to-aws",
      ],
    },
    {
      type: "category",
      label: "Developing with Metaflow",
      collapsed: false,
      items: [
        "python/metaflow/basics",
        "python/metaflow/client",
        {
          type: "category",
          label: "Visualizing Results",
          link: {
            type: "doc",
            id: "python/metaflow/visualizing-results/README",
          },
          collapsed: false,
          items: [
            "python/metaflow/visualizing-results/effortless-task-inspection-with-default-cards",
            "python/metaflow/visualizing-results/easy-custom-reports-with-card-components",
            "python/metaflow/visualizing-results/advanced-shareable-cards-with-card-templates",
          ],
        },
        "python/metaflow/debugging",
        "python/metaflow/scaling",
        "python/metaflow/data",
        "python/metaflow/dependencies",
        "python/metaflow/failures",
        "python/metaflow/tagging",
      ],
    },
    {
      type: "category",
      label: "Going to Production with Metaflow",
      collapsed: false,
      items: [
        "python/going-to-production-with-metaflow/scheduling-metaflow-flows",
        "python/going-to-production-with-metaflow/coordinating-larger-metaflow-projects",
      ],
    },
    {
      type: "category",
      label: "Internals of Metaflow",
      collapsed: false,
      items: [
        "python/internals-of-metaflow/technical-overview",
        "python/internals-of-metaflow/testing-philosophy",
      ],
    },
  ],

  r: [
    "r/README",
    {
      type: "category",
      label: "Introduction",
      collapsed: false,
      items: [
        "r/introduction/why-metaflow",
        "r/introduction/what-is-metaflow",
        "r/introduction/release-notes",
        "r/introduction/contributing-to-metaflow",
        "r/introduction/getting-in-touch",
      ],
    },
    {
      type: "category",
      label: "Getting Started",
      collapsed: false,
      items: [
        "r/getting-started/install",
        "r/getting-started/development-environment",
        {
          type: "category",
          label: "Tutorials",
          collapsed: false,
          link: { type: "doc", id: "r/getting-started/tutorials/README" },
          items: [
            {
              type: "category",
              label: "Season 1: The Local Experience",
              link: {
                type: "doc",
                id: "r/getting-started/tutorials/season-1-the-local-experience/README",
              },
              collapsed: false,
              items: [
                "r/getting-started/tutorials/season-1-the-local-experience/episode00",
                "r/getting-started/tutorials/season-1-the-local-experience/episode01",
                "r/getting-started/tutorials/season-1-the-local-experience/episode02",
                "r/getting-started/tutorials/season-1-the-local-experience/episode03",
              ],
            },
            {
              type: "category",
              label: "Season 2: Scaling Out and Up",
              link: {
                type: "doc",
                id: "r/getting-started/tutorials/season-2-scaling-out-and-up/README",
              },
              collapsed: false,
              items: [
                "r/getting-started/tutorials/season-2-scaling-out-and-up/episode04",
                "r/getting-started/tutorials/season-2-scaling-out-and-up/episode05",
                "r/getting-started/tutorials/season-2-scaling-out-and-up/episode06",
              ],
            },
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Metaflow on AWS",
      collapsed: false,
      items: [
        "r/metaflow-on-aws/metaflow-on-aws",
        "r/metaflow-on-aws/metaflow-sandbox",
        "r/metaflow-on-aws/deploy-to-aws",
      ],
    },
    {
      type: "category",
      label: "Developing with Metaflow",
      collapsed: false,
      items: [
        "r/metaflow/basics",
        "r/metaflow/client",
        "r/metaflow/debugging",
        "r/metaflow/scaling",
        "r/metaflow/failures",
        "r/metaflow/tagging",
      ],
    },
    {
      type: "category",
      label: "Going to Production with Metaflow",
      collapsed: false,
      items: ["r/going-to-production-with-metaflow/scheduling-metaflow-flows"],
    },
  ],
};

module.exports = sidebars;
