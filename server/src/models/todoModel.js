import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 50
    },

    description: {
        type: String,
        required: true,
        maxlength: 200
    },

    status: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;
