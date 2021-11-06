const express = require('express');
const router = express.Router();
const empMngController = require('../../controller/admin/employeeManagementController');

router.get('/',empMngController.demo);

module.exports = router;