const validateTodoCreateTask = (req, res, next) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({
            success: false,
            message: "Title is required"
        });
    }

    if (title.length > 50) {
        return res.status(400).json({
            success: false,
            message: "Title length limit exceeded"
        });
    }
    if(!description){
        return res.status(400).json({
            success: false,
            message: "Description is required"
        });
    }
    if(description.length>200){
        return res.status(400).json({
            success: false,
            message: "Description length limit exceeded"
        });
    }

    next();
};
const validateTodoUpdateTask = (req, res, next) => {
    const { title, description } = req.body;

    if (title && title.length > 50) {
        return res.status(400).json({
            success: false,
            message: "Title length limit exceeded"
        });
    }
    if(description && description.length > 200){
        return res.status(400).json({
            success: false,
            message: "Description length limit exceeded"
        });
    }

    next();
};


export default {validateTodoCreateTask, validateTodoUpdateTask};
