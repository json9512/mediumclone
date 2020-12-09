import {URL, displayModal} from './helper';
import {loadEditor, retrieveID} from "./utils";
import axios from "axios";


const checkIfTagExists = (list, value) => {
    for (const item of list){
        if (item.innerHTML === value){
            return true
        }
    }
    return false
}

const addTag = (tagContainer, value) => {
    const tagChildren = tagContainer.children ? tagContainer.children : []

    if (!checkIfTagExists(tagChildren, value)){
        const tags = document.createElement('span')
        tags.className = "post-tag-text"
        tags.innerHTML = value
        tags.addEventListener('click', () => {
            tagContainer.removeChild(tags)
        })
        tagContainer.append(tags)
    }
}

const convertStringWithSeperator = (string) => {
    const semi = new RegExp(";", 'gi');
    const comma = new RegExp(",", "gi");
    let inputTags = string.value.trim();
    inputTags = inputTags.replace(comma, " ")
    inputTags = inputTags.replace(semi, " ")
    return inputTags
}

const tagCreator = () => {
    const container = document.querySelector(".editor-tag");
    const tagContainer = document.querySelector('.tag-container');

    const input = document.createElement('input')
    input.className = "tag-input"

    input.addEventListener('keypress', async (event) => {
        if (event.key === 'Enter'){
            let inputTags = await convertStringWithSeperator(input)
            console.log(inputTags)
            
            if (inputTags.includes(" ")){
                inputTags = inputTags.split(" ")
                inputTags.forEach(tag => {
                    addTag(tagContainer, tag.trim())
                    input.value = ""
                })

            }else{
                addTag(tagContainer, inputTags.trim())
                input.value = ""
            }
        }
    })

    container.appendChild(input)
}

/**Editor */
if (window.location.href.indexOf("/editor") !== -1){
    let id = retrieveID('editor');

    /**Populate editor with content if post exists */
    loadEditor(id, ".editor")

    tagCreator()

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