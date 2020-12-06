import {loadEditor, retrieveID, URL} from "./utils";
import axios from "axios"

/**Editor */
if (window.location.href.indexOf("/editor") !== -1){
    let id = retrieveID('editor');

    /**Populate editor with content if post exists */
    loadEditor(id, ".editor")

    /**Add delete event on delete button */
    if (document.querySelector(".delete-button")){
        document.querySelector(".delete-button").addEventListener('click', () => {
            if (id === "none"){
                alert("You must first save the post")
            }else{
                if(confirm("Do you want to delete the post?")){
                    axios.delete(`${URL}editor/delete`, {data: {id: id}})
                    .then((res) => {
                        console.log(res.status);
                        if (res.status === 200){
                            alert("Post deleted");
                            window.location.href = `${URL}myposts`;
                        }
                    })
                    .catch((err) => {
                        alert(`Failed to delete post:\n ${err}`);
                    })  
                }
            }
        })
    }
}