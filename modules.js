//import mongoose
const mongoose = require('mongoose')
const { Schema } = mongoose
//bank model

//mongoose schema
const BookSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    gist: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    YOP: {
        type: String,
        required: true
    },
    author: [
        {
            authorId: {
                ref: 'Author',
                type: Schema.Types.ObjectId,
                required: true
            } 
        }
    ]
})
//create model via mongoose
const BookModel = mongoose.model("Books", BookSchema)
module.exports = BookModel;