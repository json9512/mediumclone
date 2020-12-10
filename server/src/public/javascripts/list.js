import {attachPostClickedDynamic, URL} from './helper';

/**
 * List of posts
 */
if (window.location.href.indexOf("/list") !== -1){
    
    attachPostClickedDynamic('posts', "individual");

    if (window.location.href.indexOf("?tag=") !== -1){
        const tagVal = window.location.href.split("?tag=")[1];
        document.querySelector(".posts-maintitle").innerHTML = `Posts with tag: ${tagVal}`;
    }
}