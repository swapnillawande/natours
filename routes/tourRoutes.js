const tourController = require('./../controllers/tourController.js');
const express = require('express');
const router = express.Router();

// router.param('id', tourController.checkID);

router.route('/')
    .get(tourController.getAllTours)
    .post(tourController.checkBody, tourController.createTour);

router.route('/:id')
    .get(tourController.getTourById)
    .patch(tourController.updateTourById)
    .delete(tourController.deleteTourById);


module.exports = router;