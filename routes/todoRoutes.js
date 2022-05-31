const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

const protect = require('../middlewares/authMiddleware');


router.route("/create").post(protect, todoController.createTodo);
router.route("/").get(protect, todoController.getallTodos);
// router.route("/:id/delete)
// router.route("/:id/update)
// router.route("/:id/item/add")
// router.route("/:id/item/delete")
// router.route("/:id/item/update")

module.exports = router;