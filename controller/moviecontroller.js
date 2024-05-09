
const movieModel=require('../models/movieModel')



//Add movies in database
const addMovieController=async(req,res)=>{
  try {
    const newMovie=new movieModel({
      ...req.body
    })
   
    await newMovie.save()
    res.status(200).send({
      success:true,
      message:"Movie added in the list"
    })
  } catch (error) {
    console.log("Error while adding Movie");
    res.status(500).send({
      success:false,
      message:"Error while adding movie",
      data:newMovie
    })
    
  }
}


// get list of movies
const getMovieController=async(req,res)=>{
  try {
    const movies=await movieModel.find({})
    res.status(200).send({
      success:true,
      message:'All Movies',
      data:movies
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:'error while fetching movies',
    })
  }
}


//update list
const updateMovieController=async(req,res)=>{
  try {
    const id=req.params.id;
    const updatedMoive =await movieModel.findByIdAndUpdate({_id:id},req.body,{new:true})
    res.status(200).send({
      success:true,
      message:'Movie data updated successfully',
      data:updatedMoive
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:'error while updating',
    })
  }
}

// delete movie data

const deleteMovieController =async(req,res)=>{
  try {
    const id= req.params.id;
    const deletedMovie=await movieModel.findByIdAndDelete({_id:id})
    res.status(200).send({
      success:true,
      message:'Movie data deleted successfully',
      data:deletedMovie
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:'error while deleting',
    })
  }
}



module.exports={addMovieController,getMovieController,updateMovieController,deleteMovieController}