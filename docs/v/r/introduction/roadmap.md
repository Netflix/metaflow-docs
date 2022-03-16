# Roadmap

Metaflow has been used in production at Netflix since early 2018. The core Metaflow was open-sourced in December 2019. Some features of Metaflow are not available in open-source yet but we may open-source them later if there is sufficient external interest. These features are listed below.

Please click the link and comment / thumbs-up the corresponding GitHub issue if you want to see the feature open-sourced.

## **Support for R Lang** 

[Metaflow in the R language](https://www.youtube.com/watch?v=lakPlz8GJcA). Provide an idiomatic R API which uses the Python library as the backend \([Github issue](https://github.com/Netflix/metaflow/issues/1)\)

## Support deployments to a production DAG scheduler

Netflix uses [an internal DAG scheduler](https://www.youtube.com/watch?v=0R58_tx7azY) to orchestrate most modeling and ETL pipelines in production. Metaflow flows can be deployed to the production scheduler with a single command. A similar integration could be provided e.g. for [AWS Step Functions](https://aws.amazon.com/step-functions/) \([Github issue](https://github.com/Netflix/metaflow/issues/2)\)

## **Support for hosting models as a micro-service**

An easy-to-use Function-as-a-Service -style [microservice hosting platform](https://www.youtube.com/watch?v=sBM5cSBGZS4) for artifacts \(e.g. models\) produced by Metaflow runs \([Github issue](https://github.com/Netflix/metaflow/issues/3)\)

## **Metaflow DataFrame**

Support in-memory processing of large data sets \([Github issue\)](https://github.com/Netflix/metaflow/issues/4)

## **MetaflowBot**

A Slack bot for Metaflow. Use it to ask questions about past runs \([Github issue](https://github.com/Netflix/metaflow/issues/5)\)

