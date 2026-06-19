const express = require('express');
const protect = require('../middlewares/authMiddleware');
const { createTask, getMyTask, updateTask, deleteTask } = require('../controllers/taskController');
const router = express.Router()


router.post('/',protect,createTask)

router.get('/',protect,getMyTask)

router.put('/:id',protect,updateTask)

router.delete('/:id',protect,deleteTask)

module.exports = router