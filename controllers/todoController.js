const Todo = require('../models/todoModel');


exports.createTodo = async (req, res) => {
    try {
        const {name} = req.body;
        const username = req.user;
        const todo = await Todo.create({name, username});
        res.status(201).json({
            status: "success",
            data: todo
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}


exports.getallTodos = async (req, res) => {
    const username = req.user;
    try {
        const allTodos = await Todo.find({username});
        res.status(200).json({
            status: "success",
            data: allTodos
        })
    } catch (error) {
        
    }
}