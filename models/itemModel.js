const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: [true, "can't create without an owner"]
    },
    todo: {
        type: String,
        required: [true, "can't create without a todo id"]
    },
    title: {
        type: String,
        required: [true, "an item has to have a name"]
    },
    done: {
        type: Boolean,
        default: false
    }
})

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;