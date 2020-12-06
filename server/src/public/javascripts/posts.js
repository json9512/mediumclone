import {loadEditor, retrieveID, URL} from './utils'
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

    loadEditor(id, '.post-viewer');
}