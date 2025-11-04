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
        "getting-started/devstack",
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
                "getting-started/tutorials/season-2-scaling-out-and-up/episode08",
              ],
            },
          ],
        },
      ],
    },

    {
      type: "category",
      label: "Developing Flows",
      link: {
            type: "doc",
            id: "metaflow/introduction",
      },
      items: [
        "metaflow/basics",
        "metaflow/client",
        {
          type: "category",
          label: "Authoring Flows Incrementally",          
          link: {
            type: "doc",
            id: "metaflow/authoring-flows/introduction",
          },
          items: [
            "metaflow/authoring-flows/spin-input-output"
          ]
        },
        {
          type: "category",
          label: "Managing Flows",          
          link: {
            type: "doc",
            id: "metaflow/managing-flows/introduction",
          },
          items: [
            "metaflow/managing-flows/notebook-runs",
            "metaflow/managing-flows/runner",
            "metaflow/managing-flows/deployer",
          ],           
        },
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
            "metaflow/visualizing-results/dynamic-cards",
            "metaflow/visualizing-results/advanced-shareable-cards-with-card-templates",
          ],
        },
        {
          type: "category",
          label: "Configuring Flows",          
          link: {
            type: "doc",
            id: "metaflow/configuring-flows/introduction",
          },
          items: [
            "metaflow/configuring-flows/basic-configuration",
            "metaflow/configuring-flows/parsing-configs",
            "metaflow/configuring-flows/custom-parsers",
            "metaflow/configuring-flows/config-driven-experimentation"
          ],           
        },
        {
          type: "category",
          label: "Composing Flows",          
          link: {
            type: "doc",
            id: "metaflow/composing-flows/introduction",
          },
          items: [
             "metaflow/composing-flows/custom-decorators",
             "metaflow/composing-flows/advanced-custom-decorators",
             "metaflow/composing-flows/mutators",
             "metaflow/composing-flows/baseflow"

          ] 
        },
      ],
    },

    {
      type: "category",
      label: "Scaling Flows",
      link: {
            type: "doc",
            id: "scaling/introduction",
      },
      items: [
        {
          type: "category",
          label: "Computing at Scale",
          link: {
            type: "doc",
            id: "scaling/remote-tasks/introduction",
          },
          items: [
            "scaling/remote-tasks/requesting-resources",
            "scaling/remote-tasks/multicore",
            "scaling/remote-tasks/spot-instances",
            "scaling/remote-tasks/controlling-parallelism",
            "scaling/remote-tasks/gpu-compute",
            "scaling/remote-tasks/installing-drivers-and-frameworks",
            "scaling/remote-tasks/distributed-computing",
            "scaling/remote-tasks/kubernetes",
            "scaling/remote-tasks/aws-batch",
          ],
        },
        {
          type: "category",
          label: "Managing Dependencies",
          link: {
            type: "doc",
            id: "scaling/dependencies/README",
          },
          items: [
            "scaling/dependencies/project-structure",
            "scaling/dependencies/libraries",
            "scaling/dependencies/uv",
            "scaling/dependencies/conda-vs-pypi",
            "scaling/dependencies/containers",
            "scaling/dependencies/internals",
            "scaling/dependencies/faq"
          ],
        },
        "scaling/failures",
        {
          type: "category",
          label: "Checkpointing Progress",
          link: {
            type: "doc",
            id: "scaling/checkpoint/introduction",
          },
          items: [
            "scaling/checkpoint/checkpoint-ml-libraries",
            "scaling/checkpoint/selecting-checkpoints",
            
          ],
        },
        "scaling/data",
        "scaling/tagging",
        "scaling/secrets"
      ]
    },

    {
      type: "category",
      label: "Deploying to Production",
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
        {
          type: "category",
          label: "Connecting Flows via Events",
          link: {
            type: "doc",
            id: "production/event-triggering/README",
          },
          items: [
            "production/event-triggering/external-events",
            "production/event-triggering/flow-events",
            "production/event-triggering/inspect-events",
            "production/event-triggering/project-events"
          ],
        },
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
        "api/runner",
        "api/deployer",
        "api/S3",
        "api/cards",
        "api/argoevent",
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
            "api/step-decorators/pypi",
            "api/step-decorators/kubernetes",
            "api/step-decorators/resources",
            "api/step-decorators/retry",
            "api/step-decorators/secrets",
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
            "api/flow-decorators/schedule",
            "api/flow-decorators/trigger",
            "api/flow-decorators/trigger_on_finish"
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
