#!/bin/bash
# create UPS for MySQL via secure gateway.
cf cups albums-mysqldb -p '{"host":"<Secure Gateway Destination HOST>", "port":"<Secure Gateway Destination PORT>", "user":"user01", "password":"user01", "database":"data"}'

cf push
