const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    bookId: {
        type: Schema.Types.ObjectId,
        ref: "Books",
        required:true
    }
})

const AuthorModel = mongoose.model('Author', AuthorSchema);
module.exports =  AuthorModel