# Episode 2: Statistics

## Is this Data Science?

Use metaflow to load the movie metadata CSV file into a Pandas Dataframe and compute some movie genre-specific statistics. These statistics are then used in later examples to improve our playlist generator. You can optionally use the Metaflow client to eyeball the results in a Notebook, and make some simple plots using the Matplotlib library.

You can find the tutorial code on [GitHub](https://github.com/Netflix/metaflow/tree/master/metaflow/tutorials/02-statistics)

**Showcasing:**

- Fan-out over a set of parameters using Metaflow [foreach](../../../metaflow/basics#foreach).
- Using external packages like Pandas.
- Plotting results in a Notebook.

**Before playing this episode:**

1. `python -m pip install pandas==1.4.2`
2. `python -m pip install notebook==6.5.3`
3. `python -m pip install matplotlib==3.7.1`

**To play this episode:**

1. `cd metaflow-tutorials`
2. `python 02-statistics/stats.py show`
3. `python 02-statistics/stats.py run`
4. `jupyter-notebook 02-statistics/stats.ipynb`

<TutorialsLink link="../../tutorials"/>
