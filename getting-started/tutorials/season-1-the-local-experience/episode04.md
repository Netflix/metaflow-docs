# Episode 4: Playlist Plus

## The Final Showdown.

Now that we've improved our genre based playlist generator. We expose a _**hint**_ parameter allowing the user to suggest a better bonus movie. The bonus movie is chosen from the movie that has the most similar name to the _**hint**_.

This is achieved by importing a string edit distance package using Metaflow's conda based dependency management feature. Dependency management builds isolated and reproducible environments for individual steps.

You can find the tutorial code on [GitHub](https://github.com/Netflix/metaflow/tree/master/metaflow/tutorials/04-playlist-plus)

**Showcasing:**

* Metaflow's [conda](../../../metaflow/dependencies.md) based dependency management.

**Before playing this episode:**

This tutorial requires the _**conda**_ package manager to be installed with the conda-forge channel added.

1. Download Miniconda at [https://docs.conda.io/en/latest/miniconda.html](https://docs.conda.io/en/latest/miniconda.html)
2. `conda config --add channels conda-forge`

**To play this episode:**

1. `cd metaflow-tutorials`
2. `python 04-playlist-plus/playlist.py --environment=conda show`
3. `python 04-playlist-plus/playlist.py --environment=conda run`
4. `python 04-playlist-plus/playlist.py --environment=conda run --hint "Data Science` `Strikes Back"`

{% page-ref page="../" %}

