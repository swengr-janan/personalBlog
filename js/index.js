const API_URL = "http://localhost:3000/api/posts";
const API_BASE_URL = "http://localhost:3000/";

window.onload = () => {
    getPosts();
}


const getPosts = () => {
    //Kukunin yung data dun sa json file natin
    fetch(API_URL, {
        method: 'GET'
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        buildPosts(data);
    })
}

const buildPosts = (blogPosts) => {
    
    blogPostContent = "";

    blogPosts.map((post) =>{

        //The date in the json file is ISO String format so we need to convert it to numbers
        const postDate = new Date(parseInt(post.added_date)).toDateString();
        //Get image
        const postImage = `${API_BASE_URL}${[post.post_image]}`
        const postLink = `/post.html?id=${post.id}`
        blogPostContent += `
        <a class="post-link" href="${postLink}">
            <div class="post-container">
                <div class="post-image" style="background-image: url(${postImage})">
                </div>
                <div class="post-content">
                <div class="post-date">${postDate}</div>
                <div class="post-title"><h4>${post.title}</h4></div>
                <div class="post-details">${post.content}</div>
                </div>
            </div>
        </a>
        `
    })

    document.querySelector('.blog-post').innerHTML = blogPostContent;
} 