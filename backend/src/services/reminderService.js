const Task = require("../models/Task");

const runReminderService = async ()=>{
    // Fetching only whose Due Date is overDue or Today
    try {
        const today = new Date();

today.setHours(0,0,0,0);

const tomorrow = new Date(today);

tomorrow.setDate(tomorrow.getDate()+1);

const tasks = await Task.find({
    status:"pending",
    dueDate:{
        $gte: today,
        $lt: tomorrow
    }
});
   
       tasks.forEach(task=> {
           console.log(`Reminder: ${task.title} is due today`);
           
       });
        
    } catch (error) {
        console.log(error.message);
        
    }
}

module.exports = runReminderService

