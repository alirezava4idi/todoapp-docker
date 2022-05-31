const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

const protect = require('../middlewares/authMiddleware');


router.route("/create").post(protect, todoController.createTodo);

module.exports = router;