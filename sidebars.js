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
        "introduction/metaflow-resources"
      ],
    },
    {
      type: "category",
      label: "Getting Started",
      items: [
        "getting-started/install",
        "getting-started/infrastructure",
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
      label: "Developing with Metaflow",
      link: {
            type: "doc",
            id: "metaflow/introduction",
      },
      items: [
        "metaflow/basics",
        "metaflow/client",
        "metaflow/debugging",
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
        }
      ],
    },

    {
      type: "category",
      label: "Scalable Flows",
      link: {
            type: "doc",
            id: "scaling/introduction",
      },
      items: [
        {
          type: "category",
          label: "Executing Tasks Remotely",
          link: {
            type: "doc",
            id: "scaling/remote-tasks/introduction",
          },
          items: [
            "scaling/remote-tasks/kubernetes",
            "scaling/remote-tasks/aws-batch",
          ],
        },
        "scaling/failures",
        "scaling/data",
        "scaling/dependencies",
        "scaling/tagging"
      ]
    },

    {
      type: "category",
      label: "Production Deployments",
      link: {
            type: "doc",
            id: "production/introduction",
      },
      items: [
        {
          type: "category",
          label: "Scheduling Metaflow Flows",
          link: {
            type: "doc",
            id: "production/scheduling-metaflow-flows/introduction",
          },
          items: [
            "production/scheduling-metaflow-flows/scheduling-with-argo-workflows",
            "production/scheduling-metaflow-flows/scheduling-with-aws-step-functions",
            "production/scheduling-metaflow-flows/scheduling-with-airflow",
          ],
        },
        "production/coordinating-larger-metaflow-projects",
      ],
    },

    {
      type: "category",
      label: "API Reference",
      link: {
        type: "doc",
        id: "api/README",
      },
      items: [
        "api/client",
        "api/flowspec",
        "api/current",
        "api/S3",
        "api/cards",
        {
          type: "category",
          label: "Step Decorators",
          link: {
            type: "doc",
            id: "api/step-decorators/README"
          },
          items: [
            "api/step-decorators/environment",
            "api/step-decorators/batch",
            "api/step-decorators/card",
            "api/step-decorators/catch",
            "api/step-decorators/conda",
            "api/step-decorators/kubernetes",
            "api/step-decorators/resources",
            "api/step-decorators/retry",
            "api/step-decorators/step",
            "api/step-decorators/timeout"
          ]
        },
        {
          type: "category",
          label: "Flow Decorators",
          link: {
            type: "doc",
            id: "api/flow-decorators/README"
          },
          items: [
            "api/flow-decorators/conda_base",
            "api/flow-decorators/project",
            "api/flow-decorators/schedule"
          ]
        }
      ],
    },
    {
      type: "category",
      label: "Internals of Metaflow",
      items: [
        "internals/release-notes",
        "internals/technical-overview",
        "internals/testing-philosophy",
        "internals/contributing"
      ],
    }
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
    }
  ],
};

module.exports = sidebars;
