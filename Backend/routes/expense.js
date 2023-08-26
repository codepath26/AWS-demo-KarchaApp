const express = require('express')
const useController = require('../controllers/ExpenseList')
const router = express.Router();


router.get('/expenseDetails',useController.getDetails)
router.get('/expenseDetails/:id',useController.getDetailsbyId)
router.post('/expenseDetails' , useController.postDetail)
router.delete('/expenseDetails/:id' , useController.deletDetail)
router.put('/expenseDetails/:id' , useController.updateDetail)
// router.get('/appointmentDetailbyId',useController.getDetailbyId)


module.exports = router;