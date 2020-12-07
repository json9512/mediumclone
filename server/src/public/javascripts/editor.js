import {URL, displayModal} from './helper';
import {loadEditor, retrieveID} from "./utils";
import axios from "axios";

/**Editor */
if (window.location.href.indexOf("/editor") !== -1){
    let id = retrieveID('editor');

    /**Populate editor with content if post exists */
    loadEditor(id, ".editor")

    /**Add delete event on delete button */
    const deleteButton = document.querySelector(".delete-button");
    if (deleteButton){
        deleteButton.addEventListener('click', () => {
            if (id === "none"){
                displayModal("You must first save the post", 'error')
            }else{
                displayModal("Do you want to delete the post?", 
                "confirm",
                [()=>{
                    // If confirm -> delete
                    axios.delete(`${URL}editor/delete`, {data: {id: id}})
                        .then((res) => {
                            console.log(res.status);
                            if (res.status === 200){
                                displayModal("Post deleted", "success", [() => {
                                    window.location.href = `${URL}myposts`;
                                }]);
                            }
                        })
                        .catch((err) => {
                            displayModal(`Failed to delete post:\n ${err}`, "error");
                        })
                }, 
                // If decline, do nothing
                () => {}])
            }
        })
    }
}