# Loading and Storing Data

This chapter describes tools and patterns for moving data in and out of your Metaflow flows.

Besides the mundane concern of loading data, there is also the question of how to organize code related to model-specific data transformations, such as feature engineering. Short answer: [keep data access separate from feature engineering](http://en.wikipedia.org/wiki/Separation_of_concerns).

In a perfect world, the data scientist could design and test features without having to concern themselves with the underlying mechanics of data transfer and processing. Unfortunately the larger the dataset, the more intermingled the two concerns become.

Metaflow can not make the world perfect yet. However, we recommend that data science workflows try to keep the two concerns as separate as possible. In practice, you should use the solutions presented in this chapter purely to load a clean dataset in your workflow. Then, you should perform any model-specific data transformations in your Python code. In particular, we recommend that you use SQL only for data access, not for model-specific data manipulation.

There are multiple benefits in keeping data access separate from model-specific data manipulation:

* It is easier to keep a model and its features in sync when they are computed together. [Metaflow's built-in versioning](tagging.md#tagging) makes it easy to iterate on multiple concurrent versions of the model safely. However, Metaflow can't protect you against stale input data. It is frustrating to troubleshoot bad model results that are caused by out-of-sync features.
* It is quicker to iterate on your model. Testing and debugging Python is easier than testing and debugging SQL.
* You can request [arbitrary amount of resources](scaling.md) for your data manipulation needs.
* Instead of having data manipulation code in two places \(SQL and Python\), all code can be clearly laid out in a single place, in a single language, for maximum readability.
* It is easier to optimize your code for performance when IO bottlenecks can be profiled separately from CPU bottlenecks.

Keep this guideline in mind when choosing the right data access method below.

## Data in Tables

Accessing data in tables \(most often Hive\) is by far the most common way to load input data to Metaflow workflows. A common paradigm is to issue arbitrary SQL queries against the data warehouse to fetch data. However, depending on the data volume and the complexity of the query, queries can be slow to execute and can potentially congest the query engine.

It is not uncommon for a data science workflow to hit these limitations. Even if your data set is not huge, you may want to build multiple models in parallel, e.g. one per country. In this case, each model needs to load a shard of data. If you used SQL to load the shards, it will very quickly overload your query engine.

As a solution, [`metaflow.S3`](data.md#data-in-s-3-metaflow-s3) provides a way to load data directly from S3, bypassing any query engines such as Spark. Combined with a [metadata catalog](https://github.com/Netflix/metacat), it is easy to write shims on top of `metaflow.S3` to directly interface with data files on S3 backing your tables. Since data is loaded directly from S3, there is no limitation to the number of parallel processes. The size of data is only limited by the size of your instance, which can be easily controlled with [the `@resources` decorator](scaling.md#requesting-resources-with-resources-decorator). The best part is that this approach is blazingly fast compared to executing SQL.

The main downside of this approach is that the table needs to have partitions that match your access pattern. For small and medium-sized tables, this isn't necessarily an issue as you can afford loading extra data. Further filtering can be performed in your Python code. With larger tables this approach is not feasible and you may need to run an extra SQL query to repartition data properly.

### **Use cases**

* Workflows that need to process large amounts of data.
* Workflows that build many models in parallel.
* Performance-oriented workflows.

## Data in S3: `metaflow.S3`

It is not always appropriate to store data in a table. For instance, Netflix has many systems that communicate via JSON files in S3. Or, there is little benefit in storing a large Keras model serialized with [`model.save()`](https://keras.io/getting-started/faq/#how-can-i-save-a-%20keras-model) in a table.

When you assign anything to `self` in your Metaflow flow, the object gets automatically persisted in S3 as [a Metaflow artifact](basics.md#linear). Hence, in most cases you do not need to worry about saving data or models to S3 explicitly. We recommend that you use Metaflow artifacts whenever possible, since they are easily accessible through [the Client API](client.md) by you, by other people, and by other workflows.

However, there are valid reasons for interacting with S3 directly. For instance, you may need to consume or produce data to a 3rd party system that knows nothing about Metaflow. For use cases like this, we provide a high-performance S3 client, `metaflow.S3`.

The sole benefit of `metaflow.S3` over Metaflow artifacts is that you get to see and control the S3 locations for data. Also, you must take care of object serialization by yourself: `metaflow.S3` only deals with objects of type `str`, `unicode`, and `bytes`.

Compared to other S3 clients `metaflow.S3` provides two key benefits: First, when used in Metaflow flows, it can piggyback on Metaflow versioning, which makes it easy to track the lineage of an object back to the Metaflow run that produced it. Secondly, `metaflow.S3` provides better throughput than any other S3 client that we are aware of. In other words, it is very fast at loading and storing large amounts of data in S3.

#### **Pros**

* Load and store data to/from arbitrary S3 locations.
* Built-in support for lineage and versioning.
* Maximum throughput between S3 and a compute instance.

#### **Cons**

* Don't use `metaflow.S3` if you can use Metaflow artifacts instead. In contrast to Metaflow artifacts, `metaflow.S3` is more tedious to use, uses space more wastefully, and it is less suitable for [moving data between Metaflow steps reliably](data.md#caution-overwriting-data-in-s3).

### **Use cases**

* Communication with external systems through files in S3.
* Special corner cases where you need more control over object serialization than what Metaflow artifacts provide by default.

We recommend that you use `metaflow.S3` in a `with` scope in Python. Objects retrieved from S3 are stored in local temporary files for the lifetime of the `with` scope, not in memory. You can use `metaflow.S3` without `with` but in this case you need to call `s3.close()` to get rid of the temporary files. See examples of this below.

Note that in order to get the maximum performance out of `metaflow.S3`, you need to set your `@resources` properly. However don't request more resources than what your workload actually needs.

### Choosing the context

To benefit from the built-in support for versioning, first you need to tell `metaflow.S3` whether it is being used in the context of a Metaflow run. A run can refer to a currently running flow \(`run=self`\) or a past run, `run=Run(...)`. If `run` is not specified, `metaflow.S3` can be used to access data without versioning in arbitrary S3 locations.

#### **Store and load objects in a Metaflow flow**

We expect that the most common use case for `metaflow.S3` is to store auxiliary data in a Metaflow flow. Here is an example:

```python
from metaflow import FlowSpec, step, S3
import json

class S3DemoFlow(FlowSpec):

    @step
    def start(self):
        with S3(run=self) as s3:
            message = json.dumps({'message': 'hello world!'})
            url = s3.put('example_object', message)
            print("Message saved at", url)
        self.next(self.end)

    @step
    def end(self):
        with S3(run=self) as s3:
            s3obj = s3.get('example_object')
            print("Object found at", s3obj.url)
            print("Message:", json.loads(s3obj.text))

if __name__ == '__main__':
    S3DemoFlow()
```

Running the flow produced the following output:

```bash
Workflow starting (run-id 3):
[3/start/646436 (pid 30559)] Task is starting.
[3/start/646436 (pid 30559)] Message saved at s3://my-bucket/metaflow/userdata/v1/S3DemoFlow/3/example_object
[3/start/646436 (pid 30559)] Task finished successfully.
[3/end/646437 (pid 30619)] Task is starting.
[3/end/646437 (pid 30619)] Object found at s3://my-bucket/metaflow/userdata/v1/S3DemoFlow/3/example_object
[3/end/646437 (pid 30619)] Message: {'message': 'hello world!'}
[3/end/646437 (pid 30619)] Task finished successfully.
```

Now you could share the URL, `s3://my-bucket/metaflow/userdata/v1/S3DemoFlow/3/example_object`, with external systems. Note that the URL includes both the flow name, `S3DemoFlow`, as well as its unique run id, `3`, which allow us to track the lineage of the object back to the run that produced it.

Note that `metaflow.S3` provides a default S3 location for storing data. You could change the location by defining `S3(bucket='my-bucket', prefix='/my/prefix')` for the constructor. Metaflow versioning information would be concatenated to the `prefix`.

#### **Load external objects produced by a Metaflow run**

What if you want to inspect S3 data produced by a flow afterwards? Just use [the Client API](client.md) as usual to locate the desired `Run` and use it to initialize an `S3` object:

```python
from metaflow import S3
with S3(run=Flow('S3DemoFlow').latest_run) as s3:
    print(s3.get('example_object').text)

{"message": "hello world!"}
```

This pattern is particularly convenient for notebooks.

#### **Store and load objects to/from a known S3 location**

The above examples inferred the S3 location based on the current or an existing Metaflow run. What if you want to load data that has nothing to do with Metaflow? Easy:

```python
from metaflow import S3
with S3() as s3:
    res = s3.get('s3://my-bucket/savin/tmp/external_data')
    print('an alien message: %s' % res.text)

an alien message: I know nothing about Metaflow
```

If `S3` is initialized without any arguments, all operations require a full S3 URL.

If you need to operate on multiple files, it may be more convenient to specify a custom S3 prefix with the `s3root` argument:

```python
from metaflow import S3
with S3(s3root='s3://my-bucket/savin/tmp/s3demo/') as s3:
    s3.put('fruit', 'pineapple')
    s3.put('animal', 'mongoose')
with S3() as s3:
    s3.get('s3://my-bucket/savin/tmp/s3demo/fruit').text

pineapple
```

If the requested URL does not exist, the `get` call will raise an exception. You can call `get` with `return_missing=True` if you want to return a missing URL as an ordinary result object, as described in the section below.

By default, `put_*` calls will overwrite existing keys in S3. To avoid this behavior you can invoke your `put_*` calls with `overwrite=False`. Refer to [this section](data.md#caution-overwriting-data-in-s3) for some of the pitfalls involved with overwriting keys in S3.

### **The S3 result object**

All `get` operations return an `S3Object`, backed by a temporary file on local disk, which exposes a number of attributes about the object:

```python
with S3(s3root='s3://my-bucket/savin/tmp/s3demo/') as s3:
    s3obj = s3.get('fruit')
    print('location', s3obj.url)
    print('key', s3obj.key)
    print('size', s3obj.size)
    print('local path', s3obj.path)
    print('bytes', s3obj.blob)
    print('unicode', s3obj.text)

location s3://my-bucket/savin/tmp/s3demo/fruit
key fruit
size 9
local path /data/metaflow/metaflow.s3.5agi129m/metaflow.s3.one_file.pih_iseg
bytes b'pineapple'
unicode pineapple
```

Note that you can not access data behind `s3obj` outside the `with` scope as the temporary file pointed at `s3obj.path` will get deleted as the scope exits.

The `S3Object` may also refer to an S3 URL that does not correspond to an object in S3. These objects have `exists` property set to `False`. Non-existent objects may be returned by a `list_path` call, if the result refers to an S3 prefix, not an object. Listing operations also set `downloaded` property to `False`, to distinguish them from operations that download data locally. Also `get` and `get_many` may return non-existent objects if you call these methods with an argument `return_missing=True`.

### Operations on multiple objects

After you have instantiated the object given the right context information, all `get` and `put` operations work equally. The context is only used to construct an appropriate S3 URL.

Besides loading individual files with `.get()` and `.put()` as shown above, `metaflow.S3` really shines at operating multiple files at once.

It is guaranteed that the list of `S3Objects` returned is always in the same order as long as the underlying data does not change. This can be important e.g. if you use `metaflow.S3` to feed data for a model. The input data will be in a deterministic order so results should be easily reproducible.

#### **Load multiple objects in parallel**

Use `get_many()` to load arbitrarily many objects at once:

```python
from metaflow import S3
with S3(s3root='s3://my-bucket/savin/tmp/s3demo/') as s3:
    s3.get_many(['fruit', 'animal'])

[<S3Object s3://my-bucket/savin/tmp/s3demo/fruit (9 bytes)>,
 <S3Object s3://my-bucket/savin/tmp/s3demo/animal (8 bytes)>]
```

Here, `get_many()` loads objects in parallel, which is much faster than loading individual objects sequentially. You can achieve the optimal throughput with S3 only when you operate on many files in parallel.

If one of the requested URLs doesn't exist, the `get_many` call will raise an exception. If you don't want to fail all objects because of missing URLs, call `get_many` with `return_missing=True`. This will make `get_many` return missing URLs amongst other results. You can distinguish between the found and not found URLs using the `exists` property of `S3Object`.

#### **Load all objects recursively under a prefix**

We can load all objects under a given prefix:

```python
from metaflow import S3
with S3() as s3:
    s3.get_recursive(['s3://my-bucket/savin/tmp/s3demo'])

[<S3Object s3://my-bucket/savin/tmp/s3demo/animal (8 bytes)>,
 <S3Object s3://my-bucket/savin/tmp/s3demo/fruit (9 bytes)>]
```

Note that `get_recursive` takes a list of prefixes. This is useful for achieving the maximum level of parallelism when retrieving data under multiple prefixes.

If you have specified a custom `s3root`, you can use `get_all()` to get all files recursively under the given prefix.

#### **Store multiple objects or files**

If you need to store multiple objects, use `put_many`:

```python
from metaflow import S3
many = {'first_key': 'foo', 'second_key': 'bar'}
with S3(s3root='s3://my-bucket/savin/tmp/s3demo_put/') as s3:
    s3.put_many(many.items())

[('first_key', 's3://my-bucket/savin/tmp/s3demo_put/first_key'),
 ('second_key', 's3://my-bucket/savin/tmp/s3demo_put/second_key')]
```

You may want to store more data to S3 than what you can fit in memory at once. This is a good use case for `put_files`:

```python
from metaflow import S3
with open('/tmp/1', 'w') as f:
    f.write('first datum')
with open('/tmp/2', 'w') as f:
    f.write('second datum')
with S3(s3root='s3://my-bucket/savin/tmp/s3demo_put/') as s3:
    s3.put_files([('first_file', '/tmp/1'), ('second_file', '/tmp/2')])

[('first_file', 's3://my-bucket/savin/tmp/s3demo_put/first_file'),
 ('second_file', 's3://my-bucket/savin/tmp/s3demo_put/second_file')]
```

Objects are stored in S3 in parallel for maximum throughput.

#### **Listing objects in S3**

To get objects with `get` and `get_many`, you need to know the exact names of the objects to download. S3 is optimized for looking up specific names, so it is preferable to structure your code around known names. However, sometimes this is not possible and you need to check first what is available in S3.

Metaflow provides two ways to list objects in S3: `list_paths` and `list_recursive`. The first method provides the next level of prefixes \(directories\) in S3, directly under the given prefix. The latter method provides all objects under the given prefix. Since `list_paths` returns a subset of prefixes returned by `list_recursive`, it is typically a much faster operation.

Here's an example: First, let's create files in S3 in a hierarchy like this:

```text
first/a/object1
first/b/x/object2
second/c/object3
```

```python
from metaflow import S3
many = {'first/a/object1': 'data',
        'first/b/x/object2': 'data',
        'second/c/object3': 'data'}
with S3(s3root='s3://my-bucket/savin/tmp/s3demo_list/') as s3:
    s3.put_many(many.items())
```

Next, let's list all directories using `list_paths`:

```python
from metaflow import S3
with S3(s3root='s3://my-bucket/savin/tmp/s3demo_list/') as s3:
    for key in s3.list_paths():
        print key.key

first
second
```

You can list multiple prefixes in parallel by giving `list_paths` a list of prefixes:

```python
from metaflow import S3
with S3(s3root='s3://my-bucket/savin/tmp/s3demo_list/') as s3:
    for key in s3.list_paths(['first', 'second']):
        print key.key

a
b
c
```

Listing may return either prefixes \(directories\) or objects. To distinguish between the two, use the `.exists` property of the returned `S3Object`:

```python
from metaflow import S3
with S3(s3root='s3://my-bucket/savin/tmp/s3demo_list/') as s3:
    for key in s3.list_paths(['first/a', 'first/b']):
        print key.key, 'object' if key.exists else 'prefix'

object1 object
x prefix
```

If you want all objects under the given prefix, use the `list_recursive` method:

```python
from metaflow import S3
with S3(s3root='s3://my-bucket/savin/tmp/s3demo_list/') as s3:
    for key in s3.list_recursive():
        print key.key

first/a/object1
first/b/x/object2
second/c/object3
```

Similar to `list_paths`, `list_recursive` can take a list of prefixes to process in parallel.

A common pattern is to list objects using either `list_paths` or `list_recursive`, filter out some keys from the listing, and provide the pruned list to `get_many` for fast parallelized downloading.

### Caution: Overwriting data in S3

You should avoid overwriting data in the same key \(URL\) in S3. S3 guarantees that new keys always reflect the latest data. In contrast, when you overwrite data in an existing key, there is a short period of time where a reader may see either the old version or the new version of the data.

In particular, when you use `metaflow.S3` in your Metaflow flows, make sure that every task and step writes to a unique key. Otherwise you may find results unpredictable and inconsistent.

Note that specifying `overwrite=False` in your `put_*` calls changes the behavior of S3 slightly compared to the default mode of `overwrite=True`. There may be a small delay \(typically in the order of milliseconds\) before the key becomes available for reading.

This is an important reason to rely on Metaflow artifacts, which handle this complication for you, whenever possible. If you absolutely need to handle this by yourself, one way to guarantee uniqueness is to use `current.task_id` from [the `current` module](tagging.md#accessing-current-ids-in-a-flow) as a part of your S3 keys.

## Data in Local Files

Similarly to [Parameters](basics.md#how-to-define-parameters-for-flows), you can define a data file to include as input for your flow. Metaflow will version the file and make it accessible to all the steps directly through the `self` object in your flow.

This example allows the user to include a data file and compute its hash:

```python
from metaflow import FlowSpec, step, IncludeFile

class HashFileFlow(FlowSpec):
    myfile = IncludeFile(
        'myfile',
        is_text=False,
        help='My input',
        default='/Users/bob/myinput.bin')

    @step
    def start(self):
        import hashlib
        print('Hello from start')
        print('Hash of file is %s' % \
            str(hashlib.sha1(self.myfile).hexdigest()))
        self.next(self.end)

    @step
    def end(self):
        print('Goodbye')

if __name__ == '__main__':
    HashFileFlow()
```

You can specify the file to use using:

```bash
python hash_flow.py run --myfile '/path/to/input/file'
```

