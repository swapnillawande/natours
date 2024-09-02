const fs = require('fs');
const express = require('express');

const toursData = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

const getAllTours = (req, res) => {
    res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        results: toursData.length,
        data: {
            tours: toursData
        }
    });
}

const getTourById = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;
    const tour = toursData.find(el => el.id === id);

    if (!tour) {
        return res.status(404)
            .json({
                status: "Fail",
                message: "Invalid ID"
            });
    } else {
        res.status(200).json({
            status: "success",
            data: {
                tour: tour
            }
        });
    }
}

const createTour = (req, res) => {
    const newId = toursData[toursData.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    toursData.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(toursData), ((err) => {

        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    }));
}

const updateTourById = (req, res) => {
    if (req.params.id * 1 > toursData.length) {
        return res.status(404).json({
            status: 'Fail',
            message: 'Invalid ID'
        })
    }

    res.status(200).json({
        status: 'Success',
        data: {
            tour: '<Updated tour here...>'
        }
    })
}

const deleteTourById = (req, res) => {

    if (req.params.id * 1 > toursData.length) {
        return res.status(404).json({
            status: 'Fail',
            message: 'Invalid ID'
        })
    }

    res.status(204).json({
        status: 'Success',
        data: null
    })
}

const router = express.Router();


router.route('/')
    .get(getAllTours)
    .post(createTour);

router.route('/:id')
    .get(getTourById)
    .patch(updateTourById)
    .delete(deleteTourById);


module.exports = router;