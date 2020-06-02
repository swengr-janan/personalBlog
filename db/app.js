//We ne to import express from node_module
const express = require("express");
const app = express();
//Kailangan iimport dito yung class na Post
const Post = require("./api/models/posts.js");
// ! We will use multer for image/file handling
const multer  = require('multer')
// ! For \ fixing in windows
const slash = require('slash');

// ! In multer, we will specify the storage and change how are we saving files in the folder
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`)
    }
  })

// ! Save all the file in specific folder ↓
var upload = multer({ storage: storage })

// ! Get extension name of the image
const getExt = (mimeType) => { 
    switch(mimeType){
        case "image/jpeg":
            return ".jpeg";
            break;
        case "image/png":
            return ".png";
            break;
    }
}

const postData = new Post(); // Initialize object

// !To prevent the error of Access-Control-Allow-Origin
// !we are going to add a middleware that will stand between
// !API endpoints and the request from server.
// next() in the parameter means go to the next middleware 
// * means everything
app.use((req, resp, next) => {
    resp.setHeader('Access-Control-Allow-Origin', '*');
    resp.setHeader('Access-Control-Allow-Methods', ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE']);
    next();
}); // middleware to set the response header

//Create another middleware to make the uploads folder 
// (which contains the image) accessible (static folder)
// ! /upload means use this midd leware on anything that has '/uploads'
app.use('/uploads', express.static('uploads'))

//! When dealing with JSON data, node js needs to be able to know how to parse it
app.use(express.json())
//! This will convert json into javascript object

//API END POINT FOR HOMEPAGE
app.get("/", (req, res) =>{
    res.status(200).send("Hello World!")
})


//API END POINT TO GET THE LIST OF ALL POST
app.get("/api/posts", (req, res) =>{
    res.status(200).send(postData.get())
})

//API END POINT TO SPECIFIC POST
app.get("/api/posts/:post_id", (req, res) =>{
    //Kukunin yung post_id sa url
    const postId = req.params.post_id;
    const foundPost = postData.getIndividualBlog(postId);

    //check kung may nakitang post base sa pinasang ID
    if(foundPost){
        res.status(200).send(foundPost);
    }else{
        res.status(404).send("Sorry, post not found!");
    }

})


//API ENDPOINT FOR ADDING NEW POST
// ! with multer
app.post("/api/posts/", upload.single('post-image'), (req, res)=>{ 
    const newPost = {
        "id": `${Date.now()}`,
        "title": req.body.title,
        "content": req.body.content,
        "post_image": slash(req.file.path),
        "added_date": `${Date.now()}`
    }
    postData.addNewPost(newPost);
    res.status(201).send(newPost);
})

app.put("/api/posts/", upload.single('post-image'), (req, res)=>{
    
    const editedPost = {
        "id": req.body.id,
        "title": req.body.title,
        "content": req.body.content,
        "post_image": slash(req.file.path),
        "added_date": `${Date.now()}`
    }

    postData.updatePost(editedPost);
    res.status(201).send(editedPost);
})

app.delete("/api/posts/:post_id", (req, res) =>{
    //Kukunin yung post_id sa url
    const postId = req.params.post_id;
    postData.deletePost(postId);

})



//We need to initialize our server
app.listen(3000, ()=>console.log("Listening on http://localhost:3000"));

//To lauch our app, nodemon app.js

