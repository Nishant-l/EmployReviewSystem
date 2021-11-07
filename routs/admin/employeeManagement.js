const express = require('express');
const { isFunctionOrConstructorTypeNode } = require('typescript');
const router = express.Router();
const empMngController = require('../../controller/admin/employeeManagementController');

router.get('/viewAllEmployee',empMngController.demo);
router.get('/Update-emloyee-profile/:empid',empMngController.updateEmployeeProfile);

router.post('/update-form/:id',empMngController.updateEmpInfo_form);

module.exports = router;