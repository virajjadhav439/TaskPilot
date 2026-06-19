const express = require('express');
const protect = require('../middlewares/authMiddleware');
const { createTask, getMyTask, updateTask, deleteTask, getTaskStats, completeTask } = require('../controllers/taskController');
const router = express.Router()


router.post('/',protect,createTask)

router.get('/',protect,getMyTask)

router.put('/:id',protect,updateTask)

router.delete('/:id',protect,deleteTask)

router.get('/stats',protect,getTaskStats)

router.patch('/:id/complete',protect,completeTask)

module.exports = router