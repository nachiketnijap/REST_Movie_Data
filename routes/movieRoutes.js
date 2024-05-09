const express=require('express')
const router=express.Router()
const { addMovieController, getMovieController, updateMovieController, deleteMovieController } = require('../controller/moviecontroller')

// create
router.post('/addMovie',addMovieController)
// read
router.get('/listOfMovies',getMovieController)
// update
router.put('/updateMovieData/:id',updateMovieController)
// delete
router.delete('/deleteMovieData/:id',deleteMovieController)

module.exports=router