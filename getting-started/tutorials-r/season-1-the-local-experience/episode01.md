# Episode 1: Playlist

## Let's build you a movie playlist.

This flow loads a movie metadata CSV file and builds a playlist for your favorite movie genre. Everything in Metaflow is versioned, so you can run it multiple times and view all the historical playlists with the Metaflow client in a Notebook.

You can find the tutorial code on [GitHub](https://github.com/Netflix/metaflow/tree/master/metaflow/tutorials/01-playlist)

**Showcasing:**

* Including external files with [IncludeFile]().
* Basic Metaflow [Parameters](../../../metaflow-r/basics.md#how-to-define-parameters-for-flows).
* Running workflow [branches](../../../metaflow-r/basics.md#branch) in parallel and joining results.
* Using the Metaflow [Client API](../../../metaflow-r/client.md) in a Notebook.

**Before playing this episode:**

1. `python -m pip install notebook`

**To play this episode:**

1. `cd metaflow-tutorials`
2. `python 01-playlist/playlist.py show`
3. `python 01-playlist/playlist.py run`
4. `python 01-playlist/playlist.py run --genre comedy`
5. `jupyter-notebook 01-playlist/playlist.ipynb`

{% page-ref page="../" %}

