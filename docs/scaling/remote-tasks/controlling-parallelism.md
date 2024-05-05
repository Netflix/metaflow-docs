
# Controlling Parallelism

It is almost too easy to execute tasks remotely using Metaflow. Consider a foreach loop
defined as follows:

```python
self.params = range(1000)
self.next(self.fanned_out, foreach='params')
```

When run with `--with batch` or `--with kubernetes`, this code would launch up to 1000
parallel instances which may turn out to be quite expensive.

To safeguard against inadvertent launching of many parallel jobs, the `run` and `resume`
commands have a flag `--max-num-splits` which fails the task if it attempts to launch
more than 100 splits by default. Use the flag to increase the limit if you actually need
more tasks.

```bash
$ python myflow.py run --max-num-splits 200
```

Another flag, `--max-workers`, limits the number of tasks run in parallel. Even if a
foreach launched 100 splits, `--max-workers` would make only 16 \(by default\) of them
run in parallel at any point in time. If you want more parallelism, increase the value
of `--max-workers`.

```bash
$ python myflow.py run --max-workers 32
```