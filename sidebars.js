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
    "index",
    {
      type: "category",
      label: "Introduction",
      items: [
        "introduction/why-metaflow",
        "introduction/what-is-metaflow",
        "introduction/release-notes",
        "introduction/roadmap",
        "introduction/contributing-to-metaflow",
        "introduction/getting-in-touch",
      ],
    },
    {
      type: "category",
      label: "Getting Started",
      items: [
        "getting-started/install",
        {
          type: "category",
          label: "Tutorials",
          link: { type: "doc", id: "getting-started/tutorials/README" },
          items: [
            {
              type: "category",
              label: "Season 1: The Local Experience",
              link: {
                type: "doc",
                id: "getting-started/tutorials/season-1-the-local-experience/README",
              },
              items: [
                "getting-started/tutorials/season-1-the-local-experience/episode00",
                "getting-started/tutorials/season-1-the-local-experience/episode01",
                "getting-started/tutorials/season-1-the-local-experience/episode02",
                "getting-started/tutorials/season-1-the-local-experience/episode03",
                "getting-started/tutorials/season-1-the-local-experience/episode04",
              ],
            },
            {
              type: "category",
              label: "Season 2: Scaling Out and Up",
              link: {
                type: "doc",
                id: "getting-started/tutorials/season-2-scaling-out-and-up/README",
              },
              items: [
                "getting-started/tutorials/season-2-scaling-out-and-up/episode05",
                "getting-started/tutorials/season-2-scaling-out-and-up/episode06",
                "getting-started/tutorials/season-2-scaling-out-and-up/episode07",
                "getting-started/tutorials/season-2-scaling-out-and-up/episode-8-autopilot",
              ],
            },
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Metaflow on AWS",
      items: [
        "metaflow-on-aws/metaflow-on-aws",
        "metaflow-on-aws/metaflow-sandbox",
        "metaflow-on-aws/deploy-to-aws",
      ],
    },
    {
      type: "category",
      label: "Developing with Metaflow",
      items: [
        "metaflow/basics",
        "metaflow/client",
        {
          type: "category",
          label: "Visualizing Results",
          link: {
            type: "doc",
            id: "metaflow/visualizing-results/README",
          },
          items: [
            "metaflow/visualizing-results/effortless-task-inspection-with-default-cards",
            "metaflow/visualizing-results/easy-custom-reports-with-card-components",
            "metaflow/visualizing-results/advanced-shareable-cards-with-card-templates",
          ],
        },
        "metaflow/debugging",
        "metaflow/scaling",
        "metaflow/data",
        "metaflow/dependencies",
        "metaflow/failures",
        "metaflow/tagging",
      ],
    },
    {
      type: "category",
      label: "Going to Production with Metaflow",
      items: [
        "going-to-production-with-metaflow/scheduling-metaflow-flows",
        "going-to-production-with-metaflow/coordinating-larger-metaflow-projects",
      ],
    },
    {
      type: "category",
      label: "Internals of Metaflow",
      items: [
        "internals-of-metaflow/technical-overview",
        "internals-of-metaflow/testing-philosophy",
      ],
    },
  ],

  r: [
    "v/r/README",
    {
      type: "category",
      label: "Introduction",
      items: [
        "v/r/introduction/why-metaflow",
        "v/r/introduction/what-is-metaflow",
        "v/r/introduction/release-notes",
        "v/r/introduction/contributing-to-metaflow",
        "v/r/introduction/getting-in-touch",
      ],
    },
    {
      type: "category",
      label: "Getting Started",
      items: [
        "v/r/getting-started/install",
        "v/r/getting-started/development-environment",
        {
          type: "category",
          label: "Tutorials",
          link: { type: "doc", id: "v/r/getting-started/tutorials/README" },
          items: [
            {
              type: "category",
              label: "Season 1: The Local Experience",
              link: {
                type: "doc",
                id: "v/r/getting-started/tutorials/season-1-the-local-experience/README",
              },
              items: [
                "v/r/getting-started/tutorials/season-1-the-local-experience/episode00",
                "v/r/getting-started/tutorials/season-1-the-local-experience/episode01",
                "v/r/getting-started/tutorials/season-1-the-local-experience/episode02",
                "v/r/getting-started/tutorials/season-1-the-local-experience/episode03",
              ],
            },
            {
              type: "category",
              label: "Season 2: Scaling Out and Up",
              link: {
                type: "doc",
                id: "v/r/getting-started/tutorials/season-2-scaling-out-and-up/README",
              },
              items: [
                "v/r/getting-started/tutorials/season-2-scaling-out-and-up/episode04",
                "v/r/getting-started/tutorials/season-2-scaling-out-and-up/episode05",
                "v/r/getting-started/tutorials/season-2-scaling-out-and-up/episode06",
              ],
            },
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Metaflow on AWS",
      items: [
        "v/r/metaflow-on-aws/metaflow-on-aws",
        "v/r/metaflow-on-aws/metaflow-sandbox",
        "v/r/metaflow-on-aws/deploy-to-aws",
      ],
    },
    {
      type: "category",
      label: "Developing with Metaflow",
      items: [
        "v/r/metaflow/basics",
        "v/r/metaflow/client",
        "v/r/metaflow/debugging",
        "v/r/metaflow/scaling",
        "v/r/metaflow/failures",
        "v/r/metaflow/tagging",
      ],
    },
    {
      type: "category",
      label: "Going to Production with Metaflow",
      items: [
        "v/r/going-to-production-with-metaflow/scheduling-metaflow-flows",
      ],
    },
  ],
};

module.exports = sidebars;
