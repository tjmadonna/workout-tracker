#/bin/bash

set -e

source .env

GOOSE_DRIVER=postgres
GOOSE_DBSTRING="host=$PGHOST user=$PGUSER password=$PGPASSWORD dbname=$PGDATABASE sslmode=$PGSSL"
GOOSE_MIGRATION_DIR="./sql/schema"

# migrate database
echo "Migrating database..."
GOOSE_DRIVER=$GOOSE_DRIVER GOOSE_DBSTRING=$GOOSE_DBSTRING goose -dir $GOOSE_MIGRATION_DIR up
