const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

const protect = require('../middlewares/authMiddleware');


router.route("/create").post(protect, todoController.createTodo);
router.route("/").get(protect, todoController.getallTodos);
router.route("/:id").get(protect, todoController.getOneTodo).patch(protect, todoController.updateOneTodo).delete(protect, todoController.deleteOneTodo);
router.route("/:id/items/").get(protect, todoController.getAllItemsOfTodo);
router.route("/:id/items/add").post(protect, todoController.addToTodo);
router.route("/:id/items/:itemid").patch(protect, todoController.updateItem).delete(protect, todoController.deleteItem);
module.exports = router;