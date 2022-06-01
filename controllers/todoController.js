const { default: mongoose } = require('mongoose');
const Todo = require('../models/todoModel');
const Item = require('../models/itemModel');


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
    const owner = req.user;
    try {
        const {title, done} = req.body;
        if(title !== undefined) {
            const todo = await Item.create({owner, todo: id, title, done});
            res.status(200).json({
                status: "success",
            })
        }else{
            res.status(400).json({
                status: "fail",
                message: "title and done is needed"
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
    const owner = req.user;
    try {
        if(id && owner){
            const items = await Item.find({todo: id, owner})
            res.status(200).json({
                status: "success",
                data: items
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

exports.updateItem = async (req, res) => {
    const id = req.params.id;
    const owner = req.user;
    const itemId = req.params.itemid;
    try {
        if(id && itemId && owner) {
            const {title, done} = req.body;
            const todoItem = await Item.findOneAndUpdate({_id:itemId, owner, todo:id}, {
                title,
                done
            }, {
                new: true,
                runValidators: true
            })
            res.status(200).json({
                status: "success",
                data: todoItem
            })
        }else{
            res.status(400).json({
                status: "fail"
            });
        }
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
}