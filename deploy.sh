#!/bin/bash
# create UPS for MySQL via secure gateway.
cf cups albums-mysqldb -p '{ "user": "<user name>", "password": "<user password>", "host": "<host name>", "port": <port>, "database": "data", "uri": "<database URI>" }'

cf push
