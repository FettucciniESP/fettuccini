/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "7wyfkyajzlpbd1x",
    "created": "2023-11-02 09:12:35.533Z",
    "updated": "2023-11-02 09:12:35.533Z",
    "name": "card_log",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("7wyfkyajzlpbd1x");

  return dao.deleteCollection(collection);
})
