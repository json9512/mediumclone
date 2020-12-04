import {attachPostClickedDynamic} from './utils';

/** For Index (home) Page */
if (window.location.pathname === "/"){
    attachPostClickedDynamic("trending-box", 'box')
    attachPostClickedDynamic("item-post", 'individual')
}