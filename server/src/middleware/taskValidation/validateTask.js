const validateCreateTask = (req, res, next) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({
            success: false,
            message: "Title is required"
        });
    }

    if (title.length > 100) {
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
    if(description.length>500){
        return res.status(400).json({
            success: false,
            message: "Description length limit exceeded"
        });
    }

    next();
};
const validateUpdateTask = (req, res, next) => {
    const { title, description } = req.body;

    if (title && title.length > 100) {
        return res.status(400).json({
            success: false,
            message: "Title length limit exceeded"
        });
    }
    if(description && description.length > 500){
        return res.status(400).json({
            success: false,
            message: "Description length limit exceeded"
        });
    }

    next();
};


export default {validateCreateTask, validateUpdateTask};
