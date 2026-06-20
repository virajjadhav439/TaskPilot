const express = require('express');
const protect = require('../middlewares/authMiddleware');
const { createTask, getMyTask, updateTask, deleteTask, getTaskStats, completeTask, getAnalytics } = require('../controllers/taskController');
const validate = require('../middlewares/validate');
const { createTaskValidation } = require('../validators/taskValidator');
const router = express.Router()


router.post('/',protect,createTaskValidation,validate,createTask)

router.get('/',protect,getMyTask)

router.put('/:id',protect,updateTask)

router.delete('/:id',protect,deleteTask)

router.get('/stats',protect,getTaskStats)

router.patch('/:id/complete',protect,completeTask)

router.get('/analytics',protect,getAnalytics)
module.exports = router