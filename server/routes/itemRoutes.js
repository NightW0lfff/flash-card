const express = require("express");
const itemController = require("../controller/itemController");
const router = express.Router();

router.route("/:id").post(itemController.createItem);

router
  .route("/:id/:itemId")
  .patch(itemController.updateItem)
  .delete(itemController.deleteItem);

module.exports = router;
