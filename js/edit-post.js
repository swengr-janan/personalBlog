const API_URL = "http://localhost:3000/api/posts/";
const API_BASE_URL = "http://localhost:3000/";

window.onload = () => {
    getPost();
}

const getPostIdParam = () => {
    // ! Get the ID from the window search
    const queryString = window.location.search; //?id=1581375207401                                         
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get("id"); //1581375207401 (specific ID)
}

const getPost = () => {
    const postId = getPostIdParam();
    //! Kinuha ko yung API URL tapos dinugtungan ko ng id
    const modifiedURL = `${API_URL}${postId}`;
    
    fetch(modifiedURL, {
        method: 'GET'
    }).then((response) =>{
        return response.json();
    }).then((data) =>{
        editPost(data);
    })
}


const editPost = (data) => {
    
    document.getElementById('form-post-title').value = data.title;
    document.getElementById('form-post-content').value = data.content;
    document.getElementById('form-post-image').files[0] = data.post_image; 
} 

const confirmEditPost = () => {

    const postId = getPostIdParam();
    const image = document.getElementById('form-post-image');
    const title = document.getElementById('form-post-title').value;
    const content = document.getElementById('form-post-content').value;
    console.log(title);
    const data = new FormData();
    data.append("post-image", image.files[0]);
    data.append("title", title);
    data.append("content", content);
    data.append("id", getPostIdParam())

    fetch(API_URL, {
        method: "PUT",
        body: data
    }).then(()=>{
         window.location.href = `index.html`
    })
}