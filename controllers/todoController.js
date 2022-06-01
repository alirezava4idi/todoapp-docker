const { default: mongoose } = require('mongoose');
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

exports.getOneTodo = async (req, res) => {
    const id = req.params.id;
    try {
        const todo = await Todo.findById(id);
        res.status(200).json({
            status: "success",
            data: todo
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
        })
    }
}

exports.updateOneTodo = async (req, res) => {
    const id = req.params.id;

    try {
        const {name} = req.body;
        if(!name) {
            res.status(400).json({
                status: "fail",
                message: "Need to have a name"
            })
        }else{
            const updatedTodo = await Todo.findByIdAndUpdate(id, {name}, {
                new: true,
                runValidators: true
            })
            res.status(200).json({
                status: "success",
                data: {
                    updatedTodo
                }
            })
        }
    } catch (error) {
        res.status(400).json({
            status: "fail"
        })
    }
}

exports.deleteOneTodo = async (req, res) => {
    const id = req.params.id;

    try {
        const todo = await Todo.findByIdAndDelete(id);

        res.status(200).json({
            status: "success"
        })
    } catch (error) {
        res.status(400).json({
            status: "fail"
        })
    }
}

exports.addToTodo = async (req, res) => {
    const id = req.params.id;
    try {
        const {name, done} = req.body;
        if(name !== undefined && done !== undefined) {
            const todo = await Todo.findByIdAndUpdate(id, {
                $push: {todos: {_id: new mongoose.Types.ObjectId() , name, done}}
            })
            res.status(200).json({
                status: "success",
            })
        }else{
            res.status(400).json({
                status: "fail",
                message: "name and done is needed"
            })
        }
    } catch (error) {
        res.status(400).json({
            status: "fail"
        })
    }
}

exports.getAllItemsOfTodo = async (req, res) => {
    const id = req.params.id;

    try {
        if(id){
            const items = await Todo.findById(id);
            res.status(200).json({
                status: "success",
                data: items.todos
            });
        }else{
            res.status(400).json({
                status: "fail",
            });
        }
    } catch (error) {
        res.status(400).json({
            status: "fail",
        }); 
    }
}