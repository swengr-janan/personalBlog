const deletePost = () => {
    const postId = getPostIdParam();
    //! Kinuha ko yung API URL tapos dinugtungan ko ng id
    const modifiedURL = `${API_URL}${postId}`;
    
    fetch(modifiedURL, {
        method: "DELETE",
    }).then(()=>{
        alert('Successfully deleted!');
        setTimeout(()=>{
            window.location.href = "index.html"
        }, 1000)
    })
}