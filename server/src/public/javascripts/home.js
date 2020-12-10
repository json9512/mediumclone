import {attachPostClickedDynamic, URL} from './helper';

/** For Index (home) Page */
if (window.location.pathname === "/"){
    attachPostClickedDynamic("trending-box", 'box')
    attachPostClickedDynamic("item-post", 'individual')
    document.querySelector(".show-all").addEventListener("click", () => {
        window.location.href = `${URL}list`
    })
}