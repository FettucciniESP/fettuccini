#!/bin/bash
set -e

# Nom de la base de données
DB_NAME="mydatabase"

# Collection dans laquelle importer
COLLECTION_NAME="words"

# Chemin du fichier JSON
JSON_PATH="/docker-entrypoint-initdb.d/words.json"

# Attente que MongoDB démarre
until mongosh --host localhost --username root --password example --eval "print(\"waited for connection\")"
do
    echo "Waiting for MongoDB to start..."
    sleep 1
done

# Importation des données
echo "Importing data into MongoDB..."
mongoimport --host localhost --db $DB_NAME --collection $COLLECTION_NAME --type json --file $JSON_PATH --jsonArray --authenticationDatabase admin --username root --password example
