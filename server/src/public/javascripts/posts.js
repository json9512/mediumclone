import {URL, shuffleArray} from './helper';
import {loadEditor, retrieveID, extractTags} from './utils';
import axios from 'axios';

/** Posts */
if (window.location.href.indexOf("/post") !== -1){

    let id = retrieveID('post');
    
    // attach on click event for create post button
    if (document.querySelector('.create-post-container')){
        document.querySelector('.create-post-container').addEventListener('click', () => {
            window.location.href = `${process.env.API_URL}editor?id=${id}`;
        })
    }

    // Attach like button
    if (document.querySelector('.left-main-container-editor')){
        
        const likeButton = document.createElement('img');
        likeButton.src = "/images/like.png";
        likeButton.alt = "like_button";
        likeButton.draggable = false;
        likeButton.className = "like-button";

        likeButton.addEventListener('click', async () => {
            const q = await axios.patch(`${URL}like`, {id})
            document.querySelector(".like-counter").innerHTML = q.data.result[0].likes
            
        })

        document.querySelector('.left-main-container-editor').appendChild(likeButton);
    }

    

    /**Check if post with id has content */
    //.post-viewer

    

    (async() => {
        await loadEditor(id, '.post-viewer');
    
        let q = await axios.post(`${URL}post/tag`, {id, tags: extractTags('.post-tag-container'), render: false})
        if (q.data.result === null){
            q = await axios.post(`${URL}post/list`, {id})
        }
        renderMorePosts(q.data.result)
    
    
    })()
}

const renderMorePosts = (data) => {
    shuffleArray(data)
    const mainContainer = document.querySelector(".more-from-container");
    const n = data.length < 3 ? data.length : 3
    for (let i = 0; i < n; i++){
        const container = document.createElement('a')
        container.className = "more-post-container"
        container.addEventListener('click', () => {
            window.location.href = `${URL}post?id=${data[i].id}`
        })

        const img = document.createElement("img")
        img.alt = "Post_picture"
        img.src = data[i].content_img
        img.draggable = false
        img.className = "more-image"

        container.appendChild(img)

        const title = document.createElement('span')
        title.className = "more-text"
        title.innerHTML = data[i].title

        container.appendChild(title)

        const author = document.createElement('span')
        author.className = "more-author"
        author.innerHTML = data[i].username

        container.appendChild(author)
        mainContainer.appendChild(container);

    }


}