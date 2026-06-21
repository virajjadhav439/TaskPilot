const express = require('express');

const connectDB = require('./config/db');
const app = require('./app');

require('dotenv').config()

require("./cron/reminderCron")


app.use(express.json())

const PORT = process.env.PORT || 3000

const startServer = async ()=>{
    try {
        await connectDB()
        app.listen(PORT,()=>{
            console.log(`The Server is Running on port ${PORT}`);
            
        })
    } catch (error) {
        console.error("Server startup failed:",error.message);
    }
}

startServer()