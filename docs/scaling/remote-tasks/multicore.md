

# Using Multiple CPU Cores

When running locally, tasks are executed as separate processes. The operating system
takes care of allocating them to separate CPU cores, so they will actually execute in
parallel assuming that enough CPU cores are available. Hence, your flow can utilize
multiple cores without you having to do anything special besides defining branches in
the flow.

When running remotely on `@batch` or `@kubernetes`, branches are mapped to separate jobs
that are executed in parallel, allowing you to *scale horizontally* to any number of
parallel tasks. In addition, you may take advantage of multiple CPU cores inside a task.
This may happen automatically if you use a modern ML library like PyTorch or Scikit
Learn, or you may parallelize functions explicitly, as explained below.

## Mapping items in parallel

Metaflow provides a utility function called `parallel_map` that helps take advantage of
multiple CPU cores. This function is almost equivalent to `Pool().map` in the Python's
built-in
[multiprocessing](https://docs.python.org/2/library/multiprocessing.html#multiprocessing.pool.multiprocessing.Pool.map)
library. The main differences are the following:

* `parallel_map` supports lambdas and any other callables of Python.
* `parallel_map` does not suffer from bugs present in `multiprocessing`.
* `parallel_map` can handle larger amounts of data.

You may also use `parallel_map` to parallelize simple operations that might be too
cumbersome to implement as separate steps.

Here is an extension of our previous example that implements a multicore `sum()` by
partitioning the matrix by row:

```python
from metaflow import FlowSpec, step, batch, parallel_map

class BigSum(FlowSpec):

    @resources(memory=60000, cpu=8)
    @step
    def start(self):
        import numpy
        import time
        big_matrix = numpy.random.ranf((80000, 80000))
        t = time.time()
        parts = parallel_map(lambda i: big_matrix[i:i+10000].sum(),
                             range(0, 80000, 10000))
        self.sum = sum(parts)
        self.took = time.time() - t
        self.next(self.end)

    @step
    def end(self):
        print("The sum is %f." % self.sum)
        print("Computing it took %dms." % (self.took * 1000))

if __name__ == '__main__':
    BigSum()
```

Note that we use `cpu=8` to request enough CPU cores, so our `parallel_map` can benefit
from optimal parallelism. Disappointingly, in this case the parallel `sum` is not faster
than the original simple implementation due to the overhead of launching separate
processes in `parallel_map`. A less trivial operation might see a much larger
performance boost.