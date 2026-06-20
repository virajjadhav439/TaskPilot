const cron = require('node-cron');
const runReminderService = require('../services/reminderService');

cron.schedule("* * * * *",async()=>{
    console.log("cron running");
    await runReminderService()
})