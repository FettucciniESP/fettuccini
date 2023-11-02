/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7wyfkyajzlpbd1x")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bgmbffpp",
    "name": "card_id",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7wyfkyajzlpbd1x")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bgmbffpp",
    "name": "card_id",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
