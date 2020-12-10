import {attachPostClickedDynamic, URL, attachClickEvent} from './helper';

/**
 * My posts
 */

if (window.location.href.indexOf("/myposts") !== -1){
    
    attachPostClickedDynamic('posts', "individual")

    // attach on click event for create post button
    if (document.querySelector('.create-post-container')){
        attachClickEvent(document.querySelector('.create-post-container'), `${URL}editor?id=none`)
    }
}