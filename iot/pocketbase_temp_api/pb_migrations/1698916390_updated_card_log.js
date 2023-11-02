/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7wyfkyajzlpbd1x")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "aeo1n4hc",
    "name": "card_player",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7wyfkyajzlpbd1x")

  // remove
  collection.schema.removeField("aeo1n4hc")

  return dao.saveCollection(collection)
})
