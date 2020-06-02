/**
 * TODO (Together): Create getPostIdParam to get the id of the post to use in the request later
 * TODO: Complete getPost function to get post data from API
 * TODO: Complete buildPost function to fill in the post data in the post.html file using ids
 */

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
        buildPost(data);
    })
}

const buildPost = (data) => {

    const postDate = new Date(parseInt(data.added_date)).toDateString();
    const postImage = `${API_BASE_URL}${[data.post_image]}`
    const editLink = `/edit-post.html?id=${data.id}`
    const deleteLink = `/delete-post.html?id=${data.id}`

    document.querySelector('.navigation').innerHTML += `
    <a href="index.html">Back</a>
    `
    document.querySelector('.actions').innerHTML += `
    <a href="${editLink}">Edit</a>
    <a data-toggle="modal" data-target="#exampleModal" href="${deleteLink}">Delete</a>
    `

    document.querySelector('header').style.backgroundImage = `url(${postImage})`;
    document.getElementById('individual-post-title').innerText = data.title;
    document.getElementById('individual-post-date').innerText = `Published on ${postDate}`;
    document.getElementById('individual-post-content').innerText = data.content;
}



