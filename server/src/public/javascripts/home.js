import {attachPostClickedDynamic} from './helper';

/** For Index (home) Page */
if (window.location.pathname === "/"){
    attachPostClickedDynamic("trending-box", 'box')
    attachPostClickedDynamic("item-post", 'individual')
}