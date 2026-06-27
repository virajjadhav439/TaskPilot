const cron = require('node-cron');
const runReminderService = require('../services/reminderService');

cron.schedule("0 9 * * *",async()=>{
    console.log("cron running");
    await runReminderService()
})