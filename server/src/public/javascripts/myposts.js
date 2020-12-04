import {attachPostClickedDynamic} from './utils';

/**
 * My posts
 */

if (window.location.href.indexOf("/myposts") !== -1){
    
    attachPostClickedDynamic('posts', "individual")

    // attach on click event for create post button
    if (document.querySelector('.create-post-container')){
        document.querySelector('.create-post-container').addEventListener('click', () => {
            window.location.href = "http://localhost:3000/editor?id=none";
        })
    }
}