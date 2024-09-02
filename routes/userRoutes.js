const express = require('express');


const getAllUsers = (req, res) => {

}

const createUser = (req, res) => {

}

const getUserById = (req, res) => {

}

const updateUserById = (req, res) => {

}

const deleteUserById = (req, res) => {

}

const router = express.Router();


router.route('/')
    .get(getAllUsers)
    .post(createUser);


router.route('/:id')
    .get(getUserById)
    .patch(updateUserById)
    .delete(deleteUserById);

module.exports = router;