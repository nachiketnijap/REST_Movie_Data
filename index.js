const express = require('express')
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const multer=require("multer");
const path=require("path");

//dot env configuration
dotenv.config();

//mongodb connection
connectDB();

const app =express()

//middlewares 
app.use(express.json())

// creating upload endpoint for images
const storage=multer.diskStorage({
  destination : './upload/images',
  filename:(req,file,cb) =>{
    return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload =multer({storage:storage});

app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('movie'),(req,res)=>{
res.json({
  success:1 ,
  image_url:`http://localhost:${port}/images/${req.file.filename}`
})
})

//route
app.use("/movie",require("./routes/movieRoutes"))

//port
const port=process.env.PORT || 8080

// listen
app.listen(port, ()=>{
  console.log(
    `Server is running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
  );
})