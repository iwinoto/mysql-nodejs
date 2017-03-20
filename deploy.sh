#!/bin/bash
# create UPS for MySQL via secure gateway.
cf cups albums-mysqldb -p '{"host":"cap-au-sg-prd-02.integration.ibmcloud.com", "port":"15481", "user":"user01", "password":"user01", "database":"data"}'

cf push
