# mysql-nodejs
Sample application for Nodejs connecting to MySQL

To run locally using [`foreman`](http://blog.daviddollar.org/2011/05/06/introducing-foreman.html) controlled by the `Procfile`. Install `foreman` with
```
$ gem install foreman
```
Set a replica of `VCAP_SERVICES` to access the database from localhost in `localhost.env` file. See an example below - replace the text in `<>` with appropriate values for your MySQLDB service endpoint:
```
VCAP_SERVICES={"user-provided": [ { "name": "albums-mysqldb", "label": "user-provided", "tags": ["mysql","sql","database"], "credentials": { "user": "<user name>", "password": "<user password>", "host": "<host name>", "port": <port>, "database": "data", "uri": "<database URI>" } } ]}
```
Run the app with
```
$ foreman start -e localhost.env
```
