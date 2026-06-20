const Task = require("../models/Task");

const runReminderService = async ()=>{
    const tasks = await Task.find({
        status:"pending"
    })

    tasks.forEach(task=> {
        console.log(`Reminder : ${task.title}`);
        
    });
}

module.exports = runReminderService

