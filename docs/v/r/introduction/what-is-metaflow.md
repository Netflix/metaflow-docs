import ReactPlayer from 'react-player'

# What is Metaflow

Metaflow is a human-friendly library that helps scientists and engineers build and
manage real-life data science projects. Metaflow was originally developed at Netflix to
boost the productivity of data scientists who work on a wide variety of projects from
classical statistics to state-of-the-art deep learning.

Metaflow provides a unified API to the infrastructure stack that is required to execute
data science projects, from prototype to production.

Under the hood, Metaflow uses the [Python version](https://docs.metaflow.org) of
Metaflow to power its actions. Hence, the R community can benefit from all the
battle-hardening and testing that goes into the Python version of Metaflow. Since this
is a technical detail, as an R user, you don't have to worry about Python unless you
want to.

## What Metaflow offers for R users

We love the data science ecosystem provided by the R community, for example, the
[tidyverse](https://www.tidyverse.org/) package suite, ergonomic [data
wrangling](https://dplyr.tidyverse.org/) tools, slick interactive communication tools
such as [Shiny](https://shiny.rstudio.com/), a data science-oriented IDE
[RStudio](https://rstudio.com/), and cutting-edge libraries for statistical computing on
[CRAN](https://cran.r-project.org/web/packages/available_packages_by_name.html).
However, oftentimes, it is left to the data scientist to string together all these
amazing tools to get their job done, adding to their burden. Metaflow provides a better
[infrastructure stack](what-is-metaflow#infrastructure-stack-for-data-science) for data
scientists in the R community in an idiomatic manner so that they can focus their energy
on data science rather than engineering.

## Should I Use Metaflow?

If you are working on an existing data science project, or you are planning to start a
new one, consider the following questions:

1. **Scalability**: Do you need more than one laptop-size computer in the project?
2. **Criticality**: Is it important that results are produced correctly and in a timely
   manner?
3. **Complexity**: Does the project have many moving pieces or many people working
   together?

If you answered "yes" to any of the above, keep reading - Metaflow can help you. If the
answer is "no" to all of the above, which is a valid scenario e.g. when you are doing
small-scale experiments on your laptop, Metaflow won't provide much benefit for you. You
should come back when your project is moving to the next stage!

## Infrastructure Stack for Data Science

Models are only a small part of an end-to-end data science project. Production-grade
projects rely on a thick stack of infrastructure. At the minimum, projects need data and
a way to perform computation on it. In a business environment like Netflix's, a typical
data science project touches all layers of the stack depicted below:

![image](/assets/triangles.png)

Data is accessed from a **data warehouse**, which can be a folder of files, a database,
or a multi-petabyte data lake. The modeling code that crunches the data is executed in a
**compute environment** which can range from a laptop to a large-scale container
management system. A **job scheduler** is often used to orchestrate multiple units of
work.

How do you **architect** the code to be executed? Should you structure it as an object
hierarchy, R functions, or packages? How do you **version** the code, input data, and
models produced? Preferably, data scientists wouldn't have to spend too much energy
thinking about the software architecture.

After the model has been deployed to production, **model operations** become a pertinent
question: how do you keep the code running reliably in production? How do you monitor
its performance? How do you deploy new versions of the code to run in parallel with the
previous version? The software industry has spent over a decade perfecting DevOps best
practices for normal software. We are just getting started with data science.

At the very top of the stack there's the question of how you produce **features** for
your models, and you **develop models** in the first place, maybe using off-the-shelf
libraries. This is the area where the skills of a data scientist become most useful.

Metaflow provides a unified, human-friendly approach to navigating the stack. Metaflow
is more prescriptive about the lower levels of the stack, but is less opinionated about
the actual data science at the top of the stack. Metaflow allows you to write your
models and business logic as idiomatic R code with not much new to learn.

Internally, Metaflow leverages existing infrastructure when feasible. In particular, it
is [tightly integrated with Amazon Web
Services](https://github.com/Netflix/metaflow-docs/tree/b90f7b9c89a00a9c344df9d41bfd39b23a674bd8/metaflow-on-aws/metaflow-on-aws.md).
The core value proposition of Metaflow is its integrated full-stack, human-centric API,
rather than reinvention of the stack itself.

You can find more details about Metaflow's approach to various parts of the stack across
the documentation:

|                       |                                                                                                    |
| :-------------------- | :------------------------------------------------------------------------------------------------- |
| **Model Development** | [Basics of Metaflow](../metaflow/basics)                                                           |
| **Model Operations**  | [Debugging with Metaflow](../metaflow/debugging) and [Dealing with Failures](../metaflow/failures) |
| **Versioning**        | [Inspecting Flow and Results](../metaflow/client) and [Organizing Results](../metaflow/tagging)    |
| **Architecture**      | [Basics of Metaflow](../metaflow/basics)                                                           |
| **Job Scheduler**     | coming soon, see [Roadmap]                                                                         |
| **Compute Resources** | [Scaling Out and Up](../metaflow/scaling)                                                          |
| **Data Warehouse**    | [Basics of Metaflow](../metaflow/basics)                                                           |

If you are an infrastructure person who wants to know how to deploy and operate
Metaflow, take a look at [Administrator's Guide to
Metaflow](https://outerbounds.com/docs/admin).

If you want to learn more, the Machine Learning Infrastructure team at Netflix has given
a number of public presentations about Metaflow prior to its open-sourcing. You can find
links to these presentations below.

For starters, this presentation gives a comprehensive overview of Metaflow:

<ReactPlayer  controls url="https://www.youtube.com/watch?v=XV5VGddmP24" />

For other general overviews of Metaflow, see the [Overviews of
Metaflow](https://www.youtube.com/playlist?list=PLGEBSHR02Xbg0oTf7OwZ_Kk86Zx96mAOb)
playlist. For more technical details, see presentations about the [Internals of
Metaflow](https://www.youtube.com/playlist?list=PLGEBSHR02XbhC-5Eqy7ERHxpuwiJHes4j).

## The Philosophy of Metaflow

If you are eager to give Metaflow a try, head to the
[tutorials](../getting-started/tutorials/). If you want to learn about the background of
Metaflow in more detail, keep on reading.

Metaflow was originally designed and built to address practical pain points of data
scientist at Netflix. Its design philosophy is influenced by [the unique culture at
Netflix](https://jobs.netflix.com/culture). The following eight tenets summarize the
philosophy of Metaflow:

### 1. Grounded on common, real-life business-oriented ML use cases

We don’t focus on exotic, large-scale, specific use cases like real-time bidding or
self-driving cars. Instead, we focus on the widest variety of ML use cases, many of
which are small or medium-sized, which many companies face on a day-to-day basis.

We embrace the fact that the life is full of entropy: There is no elegant, grand unified
theory of ML infrastructure. The inputs to ML workflows are noisy, the models may be
ridden with special cases, and the outputs need to be integrated with various downstream
systems, instead of a single unified UI.

We don’t expect the users of Metaflow to be unicorns who are experts in software
engineering and machine learning. Nor we expect our users to care about ML
infrastructure. Metaflow helps them to get their job done.

### 2. Manage entropy with code

The first tenet implies that we must manage a great amount of inherent, irreducible
complexity. Many ML infrastructures rely on GUIs, configuration, DSLs, or automation -
we don’t. Most of these modalities fail to scale in terms of increasing complexity.

We rely on code. General-purpose programming languages are arguably the most effective
tool in building functional systems for complex use cases. The main downside of code is
a steeper learning curve: for the simplest use cases, almost any other modality would
provide a simpler solution. To minimize this cost, we rely on easy to learn, popular
languages like Python or R.

### 3. Fanatic focus on usability and ergonomics

The second tenet implies that we don’t try to hide the complexity. Inherently complex
problems require complex solutions. However, we can do a lot to reduce the amount of
accidental complexity which often results from mismatching abstractions.

Since the problems our users solve are complex in nature, the best we can do is to avoid
adding unnecessary complexity and cognitive overhead with complicated tools. Metaflow
should be simple and highly usable.

We don’t expect tools to solve problems. People solve problems. Hence, we focus on
optimizing data scientist productivity, which we do by providing ergonomic tools,
excellent documentation, and fanatic support.

### 4. Enable collaboration

Besides the first-person developer experience described in the third tenet, Metaflow is
built to enable collaboration. However, we are sensitive to the fact that there is not a
single recipe for collaboration. Sometimes it might be just a single developer
“collaborating” with themselves over a long period of time. Sometimes it might be a
tightly coupled team working on a common project. Sometimes it is a loosely coupled
organization working on separate projects, sharing pieces of code and data. We want to
support all these scenarios.

Instead of being prescriptive about the ways of collaboration, we remove roadblocks that
hinder collaboration. Most importantly, we enable unsurprising, side effect free
reproducibility, which removes the fear of interfering with other people’s work. We also
make it easy to discover and access previous results produced by others.

### 5. First-class support for both prototyping and production

The third and fourth tenets make Metaflow human-centric. People produce complex creative
work iteratively. We want to make iterative development the default mode of operation:
**y**ou can start prototyping locally with a very straightforward script, which you can
make gradually more capable and scalable, if the results after each iteration seem
promising enough.

Metaflow should be robust enough for serious production use. However, we recognize that
“production” is a spectrum: Some projects get pushed from prototype to production
quickly in a very experimental shape. This is OK. Some projects have such a short life
cycle, or they are not a critical path, so it doesn’t make sense to invest a lot in
making them watertight.

We want to embrace the idea that most projects are continuous experiments, even when
they are being run in production. Consider Metaflow as a meta-algorithm for
reinforcement learning with a human in the loop.

### 6. Straightforward scalability

The fifth tenet suggested that the user should be able to scale a Metaflow project
gradually. This applies both to time and space.

We embrace the fact that R is a slow but expressive language. We encourage our users to
write idiomatic R code initially, without worrying too much about performance. If
performance becomes an issue, we can provide an arsenal of tools for gradual performance
optimization from performance-oriented libraries like Rcpp.

We encourage our users to primarily rely on vertical scalability, which allows the user
to focus on readable, straightforward code and easy operations. When the user hits the
limits of vertical scalability, we make it easy to use horizontal, share-nothing
parallelism, or hassle-free distributed learning provided e.g. by AWS Sagemaker.

We shy away from custom paradigms for scalability which require code to be \(re\)written
with scalability in mind, which can lead to worse readability, harder debuggability, and
increased operational burden.

### 7. Pragmatic approach to data access and processing

The sixth tenet suggested that our primary tools for scalability and performance are
larger servers and faster libraries. Typically, it is larger datasets that demand larger
tools. Since the question of big data is so central to ML projects, we want to provide
specific data tooling to address these needs.

Following the sixth tenet, we don’t want to introduce new paradigms for data processing.
Instead, we want to make old, proven paradigms usable again: We make sure that the basic
libraries for loading data, representing data in memory, and transforming data are
performant and easy to use.

We also recognize that this approach has its limits. We leverage other big data tools
such as Spark for heavy lifting when necessary.

### 8. Failures are a feature

We design Metaflow primarily for failure cases, not for the happy case. Most ML
infrastructures do the job well enough for the happy case. The true value of the
infrastructure is shown when things fail. This is especially true for ML workflows with
a high degree of inherent complexity.

Most of the lifetime cost of a successful ML project comes from operational cost which
is accumulated after the first production deployment, similar to any software project.
To minimize this cost, we want to make operational issues easy to diagnose and fix. This
is a key motivation for the sixth and the seventh tenets, since many if not most
operational issues are related to scalability and data.

We provide highly usable tools for proactive monitoring and detection of errors, before
things fail catastrophically, as well for reactive debugging.

## Conclusion

Don't expect the current version of Metaflow to be a perfect manifestation of these
principles. Metaflow is being actively developed. However, much of the foundation
exists, and it has proven to be successful at Netflix. If this vision resonates with
you, we welcome you to join the project! A good next step is to take a look at the
[tutorials](../getting-started/tutorials/).
