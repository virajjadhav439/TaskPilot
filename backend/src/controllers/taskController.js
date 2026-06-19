const Task = require("../models/Task")

const createTask = async (req,res)=>{
    
    try {
        // Fetch the Details
    const {title,description,status,priority,dueDate} = req.body
    //Create a New Task
    const task = await Task.create({
        title,description,status,priority,dueDate,user:req.user.userId
    })

    return res.status(201).json({
        message:'Task Created Successfully',
        task,
    })
    } catch (error) {
        return res.status(500).json({
            message:'Task Creation Failed',error:error.message
        })
    }
}

const getMyTask = async (req,res)=>{
    try {
        //Fields to filter
        const {status,priority} = req.query
        // Create Filter
        const filter = {user:req.user.userId}
        
        if (status) {
            filter.status = status
        }
        if (priority) {
            filter.priority = priority
        }

        const tasks = await Task.find(filter)
        
        return res.status(200).json({
            tasks
        })
    } catch (error) {
        return res.status(500).json({
            message:"Failed in Getting All Tasks",error:error.message
        })
    }
}

const updateTask = async (req,res)=>{
    try {

        const {title,description,status,priority,dueDate} = req.body

        const task = await Task.findById(req.params.id)

        if (!task) {
    return res.status(404).json({
        message:"Task Not Found"
    })
}

        if(task.user.toString() !== req.user.userId){
            return res.status(403).json({
                message:"Not Authorized"
            })
        }

        const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    {
        title,
        description,
        status,
        priority,
        dueDate
    },
    {
        returnDocument:"after"
    }
)

        return res.status(200).json({
            message:"Task Updated Successfully",
            task: updatedTask
        })

    } catch (error) {

        return res.status(500).json({
            message:"Task Updation Failed",
            error:error.message
        })

    }
}

const deleteTask = async (req,res)=>{
    try {
        const task = await Task.findById(req.params.id)

        if (!task) {
            return res.status(404).json({
                message:"Task Not Found",
            })
        }

        if (task.user.toString() !== req.user.userId) {
            return res.status(403).json({
                message:"Not Authorized"
            })
        }

        await Task.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            message:"Task Was Deleted Succussfully",
        })

    } catch (error) {
        return res.status(500).json({
            message:"Task Deletion Failed",error:error.message,
        })
    }
}

const getTaskStats = async (req,res)=>{
    try {
        const totalTasks = await Task.countDocuments({
            user:req.user.userId
        })
        const completedTasks = await Task.countDocuments({
            user:req.user.userId,
            status:"completed",
        })
        const pendingTasks = await Task.countDocuments({
            user:req.user.userId,
            status:"pending",
        })

        return res.status(200).json({
            totalTasks,
            completedTasks,
            pendingTasks,
        })
        
    } catch (error) {
        return res.status(500).json({
            message:"Error Fetching in Task Statistics",error:error.message
        })
    }
}

module.exports = {
    createTask,
    getMyTask,
    updateTask,
    deleteTask,
    getTaskStats,
}