---
title: Cheat Sheet - PostGreSQL
---

## Useful Meta-Commands (psql specific)

### List all available commands
```sql
\?
```

### List all databases
```sql
\l
```

### List all tables
```sql
\dt
```

### View the structure of a table
```sql
\d table_name
```

### Exit psql
```sql
\q
```

## Database Management

### Create a new database
```sql
CREATE DATABASE database_name;
```

### Delete a database
```sql
DROP DATABASE database_name;
```

### List all databases
```sql
\l
```

### Connect to a database
```sql
\c database_name;
```

##  Table Management

### Create a table
```sql
CREATE TABLE table_name (
    column1 data_type PRIMARY KEY,
    column2 data_type NOT NULL,
    column3 data_type DEFAULT value
);
```

### Delete a table
```sql
DROP TABLE table_name;
```

### List all tables
```sql
\dt
```

### Describe table schema
```sql
\d table_name
```

### Rename a table
```sql
ALTER TABLE old_table_name RENAME TO new_table_name;
```

## Column Management

### Add a column
```sql
ALTER TABLE table_name ADD COLUMN column_name data_type;
```

### Delete a column
```sql
ALTER TABLE table_name DROP COLUMN column_name;
```

### Rename a column
```sql
ALTER TABLE table_name RENAME COLUMN old_column_name TO new_column_name;
```

## Basic CRUD Operations

### Insert data into a table
```sql
INSERT INTO table_name (column1, column2) VALUES (value1, value2);
```

### Select data from a table
```sql
SELECT column1, column2 FROM table_name WHERE condition;
```

### Update data in a table
```sql
UPDATE table_name SET column1 = value1 WHERE condition;
```

### Delete data from a table
```sql
DELETE FROM table_name WHERE condition;
```


## Join Operations

### Inner join
```sql
SELECT * FROM table1 INNER JOIN table2 ON table1.column = table2.column;
```

### Left join
```sql
SELECT * FROM table1 LEFT JOIN table2 ON table1.column = table2.column;
```

### Right join
```sql
SELECT * FROM table1 RIGHT JOIN table2 ON table1.column = table2.column;
```
## Constraints and Indexes

### Add a unique constraint
```sql
ALTER TABLE table_name ADD CONSTRAINT constraint_name UNIQUE (column_name);
```

### Add an index
```sql
CREATE INDEX index_name ON table_name (column_name);
```

### Remove an index
```sql
DROP INDEX index_name;
```



## User Management

### Create a new user
```sql
CREATE USER user_name WITH PASSWORD 'password';
```

### Grant privileges to a user
```sql
GRANT ALL PRIVILEGES ON DATABASE database_name TO user_name;
```

### Revoke privileges from a user
```sql
REVOKE ALL PRIVILEGES ON DATABASE database_name FROM user_name;
```

### Delete a user
```sql
DROP USER user_name;
```




## Transactions

### Begin a transaction
```sql
BEGIN;
```

### Commit a transaction
```sql
COMMIT;
```

### Rollback a transaction
```sql
ROLLBACK;
```



## Additional Queries and Functions

### Count rows in a table
```sql
SELECT COUNT(*) FROM table_name;
```

### Find distinct values
```sql
SELECT DISTINCT column_name FROM table_name;
```

### Order results
```sql
SELECT * FROM table_name ORDER BY column_name ASC|DESC;
```

### Limit number of results
```sql
SELECT * FROM table_name LIMIT number;
```


