const PATH = "./data.json";
//Reading json file
const fs = require('fs');

class Post {

    get(){
        return this.readData();
    }

    getIndividualBlog(postId){
        // Get individual blog post

        //get the list of all posts from data.json
        const posts = this.readData();

        //Find the specific post from the list based from the ID
        const foundPost = posts.find((post) => post.id === postId);
        // find me a (post) where => post.id inside the posts list is == to postId

        return foundPost;
         
    }

    addNewPost(newPost){
        //Kunin yung mga dating laman ng data.json kasi inooverwrite yung file tuwing mag aadd
        const currentPosts = this.readData();
        //ilalagay sa unahan yung newPost
        currentPosts.unshift(newPost);
        this.storeData(currentPosts);
        
    }

    updatePost(editedPost){
        const currentPosts = this.readData();
        let postIndex = currentPosts.findIndex((post)=> post.id === editedPost.id)

        const foundImage = currentPosts.find((post) => post.id === editedPost.id);
        const imagePath = foundImage.post_image;

        if(postIndex > -1){
            currentPosts.splice(postIndex, 1, editedPost);
        }

        try{
            fs.unlinkSync(imagePath)
            //file removed
        }catch(err) {
            console.error(err)
        }

        this.storeData(currentPosts);

    }

    deletePost(postId){
        const currentPosts = this.readData();
        let postIndex = currentPosts.findIndex((post)=> post.id === postId)

        const foundImage = currentPosts.find((post) => post.id === postId);
        const imagePath = foundImage.post_image;

        if(postIndex > -1){
            currentPosts.splice(postIndex, 1);
        }
        this.storeData(currentPosts);

        try{
            fs.unlinkSync(imagePath)
            //file removed
        }catch(err) {
            console.error(err)
        }
    }

    readData(){
        //read data from data.json
        let rawData = fs.readFileSync(PATH);
        let posts = JSON.parse(rawData);
        return posts;
    }

    storeData(newPost){
        let data = JSON.stringify(newPost);
        fs.writeFileSync(PATH, data);
    }

}

module.exports = Post;