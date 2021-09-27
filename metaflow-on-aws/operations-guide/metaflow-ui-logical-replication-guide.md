# Metaflow UI Logical Replication Guide

Administrators may consider logical replication for UI service so that existing infrastructure has minimal impact in terms of load and interference originated from UI service. Read replica is not an option for UI service, since the service is responsible for creating table triggers to the database.

Logical replication of a table typically starts with taking a snapshot of the data on the publisher database and copying that to the subscriber. Once that is done, the changes on the publisher are sent to the subscriber as they occur in real-time. The subscriber applies the data in the same order as the publisher so that transactional consistency is guaranteed for publications within a single subscription.

Below you will find high level instructions on how to create publication and subscription between two database instances.

Please note that PostgreSQL 10.0 or above is required for logical replication.

## Create publication

**Prerequisites**
* Database [WAL level](https://www.postgresql.org/docs/10/runtime-config-wal.html) should be set to `logical`

```sql
CREATE PUBLICATION metaflow_ui_publication
         FOR TABLE flows_v3, runs_v3, steps_v3, tasks_v3, artifact_v3, metadata_v3;
```

Read more about [creating a publication.](https://www.postgresql.org/docs/10/sql-createpublication.html)

## Create subscription

**Prerequisites**
* Subscriber database should have migrations up-to-date
  * All tables should exist and schema should be identical to publication
* Subscriber should be able to connect publisher database

```sql
CREATE SUBSCRIPTION metaflow_ui_subscription
         CONNECTION 'host=publication.database.host port=5432 user=postgres password=postgres dbname=postgres'
        PUBLICATION metaflow_ui_publication
               WITH (enabled = true, copy_data = true);
```

Where
* **enabled = true** - Starts replication process immediately
* **copy_data = true** - Copy all existing data from the publication

Read more about [creating a subscription.](https://www.postgresql.org/docs/10/sql-createsubscription.html)
