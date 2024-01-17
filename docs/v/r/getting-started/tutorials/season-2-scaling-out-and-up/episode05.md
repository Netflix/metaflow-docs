# Episode 5: Statistics Redux

This example revisits [**Episode 02-statistics: Is this Data
Science?**](../season-1-the-local-experience/episode02.md).

With Metaflow, you don't need to make any code changes to scale up your flow by running
on remote compute. In this example we re-run the `stats.R` workflow adding the `--with
batch` command line argument. This instructs Metaflow to run all your steps on AWS batch
without changing any code. You can control the behavior with additional arguments, like
`--max-workers`. For this example, `--max-workers` is used to limit the number of
parallel genre-specific statistics computations. You can then access the data artifacts
\(even the local CSV file\) from anywhere because the data is being stored in AWS S3.

## Showcasing:

- `--with batch` command line option
- `--max-workers` command line option
- Accessing data artifact stored in AWS S3 from a local Markdown Notebook.

## Before playing this episode:

Configure your [sandbox](https://metaflow.org/sandbox).

## To play this episode:

If you haven't yet pulled the tutorials to your current working directory, you can
follow the instructions [here](../#pull-tutorials).

1. `cd tutorials/02-statistics/`
2. `Rscript stats.R --package-suffixes=.R,.csv run --with batch --max-workers 4`
3. Open `02-statistics/stats.Rmd` in your RStudio and re-run the cells. You can access
   the artifacts stored in AWS S3 from your local RStudio session.
