import {URL, displayModal} from './helper';

if (document.querySelector('.error')){
    displayModal("Please verify your email !", "error", [() => {window.location.href = `${URL}`}]);
}