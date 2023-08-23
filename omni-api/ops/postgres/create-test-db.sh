#!/bin/bash
set -e

TEST_DB_NAME=$(echo "$POSTGRES_DB"-test)

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE "$TEST_DB_NAME";
EOSQL
