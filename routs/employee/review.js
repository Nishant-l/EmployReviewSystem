const express = require('express');
const router = express.Router();
const controller = require('../../controller/employee/reviewController');

router.get('/:id',controller.homeView);

router.post('/fidback-form/:id',controller.review_form);

module.exports = router;