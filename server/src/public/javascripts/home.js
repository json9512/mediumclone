import {attachPostClickedDynamic, URL, attachClickEvent} from './helper';

/** For Index (home) Page */
if (window.location.pathname === "/"){
    attachPostClickedDynamic("trending-box", 'box')
    attachPostClickedDynamic("item-post", 'individual')
    attachClickEvent(document.querySelector(".show-all"), `${URL}list`)
}