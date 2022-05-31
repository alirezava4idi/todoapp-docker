const mongoose = require('mongoose');


const todoSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Todos need a userid to be created"]
    },
    name: {
        type: String,
        lowercase: true,
        required: [true, "Todos need a name"],
        unique: true
    },
    todos: {
        type: Array
    }
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;