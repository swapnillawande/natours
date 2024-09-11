const fs = require('fs');
const Tour = require('./../models/tourModel.js');
const express = require('express');


exports.checkID = (req, res, next, val )=>{

    if (req.params.id * 1 > toursData.length) {
        return res.status(404).json({
            status: 'Fail',
            message: 'Invalid ID'
        })
    }

    next();
}

exports.checkBody = (req, res, next) =>{
     if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status : "Fail",
            message : "Missing name or price"
        })
    }

    next();
}


exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        // results: toursData.length,
        // data: {
        //     tours: toursData
        // }
    });
}

exports.getTourById = (req, res) => {
    const id = req.params.id * 1;
    // const tour = toursData.find(el => el.id === id);
    //     res.status(200).json({
    //         status: "success",
    //         data: {
    //             tour: tour
    //         }
    //     });
}

exports.createTour = (req, res) => {
    const newId = toursData[toursData.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    // toursData.push(newTour);
    // fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(toursData), ((err) => {

    //     res.status(201).json({
    //         status: 'success',
    //         data: {
    //             tour: newTour
    //         }
    //     })
    // }));
}

exports.updateTourById = (req, res) => {
    res.status(200).json({
        status: 'Success',
        data: {
            tour: '<Updated tour here...>'
        }
    })
}

exports.deleteTourById = (req, res) => {
    res.status(204).json({
        status: 'Success',
        data: null
    })
}