const express = require('express');
const protect = require('../middlewares/authMiddleware');
const { createTask, getMyTask, updateTask, deleteTask, getTaskStats, completeTask, getAnalytics } = require('../controllers/taskController');
const validate = require('../middlewares/validate');
const { createTaskValidation } = require('../validators/taskValidator');
const router = express.Router()

router.get('/',protect,getMyTask)
router.get('/stats',protect,getTaskStats)
router.get('/analytics',protect,getAnalytics)

router.post('/',protect,createTaskValidation,validate,createTask)

router.put('/:id',protect,updateTask)

router.delete('/:id',protect,deleteTask)

router.patch('/:id/complete',protect,completeTask)

module.exports = router