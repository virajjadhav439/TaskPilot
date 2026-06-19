const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = require('./app');

require('dotenv').config()

app.use(cors())
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