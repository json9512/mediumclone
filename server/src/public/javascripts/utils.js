import {EditorState} from 'prosemirror-state';
import {EditorView} from 'prosemirror-view';
import {Schema, DOMParser} from 'prosemirror-model';
import {schema} from 'prosemirror-schema-basic';
import {addListNodes} from 'prosemirror-schema-list';
import {exampleSetup} from 'prosemirror-example-setup';
import axios from 'axios';

export const mySchema = new Schema({
    nodes : addListNodes(schema.spec.nodes, "paragraph block*", "block"),
    marks: schema.spec.marks
});

/**
 * TODO: separate this file into sub files
 */

export const retrieveID = (substring) => {
    if (window.location.href.indexOf(`${substring}?id`) !== -1){
        let temp = window.location.href.split('?id=')[1];
        if (temp.indexOf("#")){
            temp = temp.split("#")[0]
        }
        return temp;
    }
    return "none";
}


export const createEditButton = (id) => {
    const editButton = document.createElement('span')
    editButton.className = 'edit-post-container';
    editButton.innerHTML = 'Edit';
    editButton.addEventListener('click', () => {
        window.location.href = `http://localhost:3000/editor?id=${id}`
    });

    return editButton;
}

// Define onclick functions
export const attachPostClicked = (item, id) => {
    item.addEventListener('click', ()=>{
        window.location.href = `http://localhost:3000/post?id=${id}`;
    })
}

export const attachPostClickedDynamic = (className, type) => {
    // Dynamically attach onclick events to each article post

    // box types
    if (type === "box"){
        if (document.getElementsByClassName(className).length > 0){
            const items = document.getElementsByClassName(className)
            for(let i = 0; i < items.length; i++){
                attachPostClicked(items[i], items[i].id)
            }
        }
    }else{
        // Title, description type
        const title = className+'-title';
        const description = className+'-description'
        if (document.getElementsByClassName(title).length > 0){
            const titleItems = document.getElementsByClassName(title)
            const descriptionItems = document.getElementsByClassName(description)
            for(let i = 0; i < titleItems.length; i++){
                attachPostClicked(titleItems[i], titleItems[i].id)
                attachPostClicked(descriptionItems[i], descriptionItems[i].id)
            }
        }
    }
    
}

/**
 * Saves the current state to the database
 */
export const saveClickFunc = (id, comments, likes) => {
    if (likes === undefined || likes === null || likes === {}){
        likes = 0;
    }
    // Get info 
    const document = window.view.state.toJSON();
    // This will come from myposts it can also be none if this is created from scratch
    axios.post("http://localhost:3000/editor", {
        id, document, comments, likes
    }).then((res) => {
        console.log(res);
        alert("Save complete")
        window.location.href = "http://localhost:3000/myposts";
    }).catch((err) => {
        console.log(err);
        alert("Save failed")
    })

}


export const loadEditor = async (id, classTag) => {
    // Initialize vars
    let dataObj = "";
    let comments = "";
    let likes = 0;
    let editable = true;

    // Check if post with id exists
    if (id !== "none"){
        let isAuthor = false;

        // Load data to dataObj
        dataObj = await axios.post("http://localhost:3000/post/id", {
            id: id
            })
            .then(async (res) => {
                if (res.data){
                    // if isAuthor, populate edit button
                    if (res.data.isAuthor){
                        if (classTag === ".post-viewer"){
                            document.querySelector(".right-main-container-editor").appendChild(createEditButton(id)) 
                        }

                        isAuthor = await res.data.isAuthor;
                    }
                    
                    return res.data.result[0];
                }
        
            })
            .catch((err) => {
                console.log(`Author check failed: ${err}`);
                return null;
            })
            
        if (isAuthor === false && classTag === `.editor`){
            alert("You do not have rights to edit this post !")
            window.location.href = window.location.href.split(":3000")[0] + ":3000/";
            return;
        }

        // Get content of the post
        comments = dataObj.comments ? dataObj.comments : {};
        likes = dataObj.likes ? dataObj.likes : 0;

        // Set the editor to disabled when this func is called from /post
        if (classTag === ".post-viewer"){
            editable = false;
        }
        
        // Get content of the post
        if (document.querySelector(`${classTag}`)){
            window.view = await new EditorView(document.querySelector(`${classTag}`), {
                state : EditorState.create({
                    doc: mySchema.nodeFromJSON(dataObj.document.doc),
                    plugins: exampleSetup({schema: mySchema})
                }),
                editable: () => {return editable}
                
            })
            
        }

        // Disable menubar when called from /post
        if (classTag === ".post-viewer"){
            // Disable menu bar
            document.querySelector(".ProseMirror-menubar").style.visibility = "hidden";
        }

        // Populate save button when called from /editor
        if (classTag === ".editor"){
            if (document.querySelector(".save-button")){
                document.querySelector(".save-button").addEventListener('click', () => {
                    saveClickFunc(id, comments, likes);
                });
            }
        }

        // Populate number of likes
        if (classTag === ".post-viewer"){
            const likeCounter = document.createElement("span")
            likeCounter.className = "like-counter"
            likeCounter.innerHTML = likes;
            document.querySelector(".left-main-container-editor").appendChild(likeCounter);
        }
    
    } else {
        // If id === none, it means the page is on editor
        if (window.location.href.indexOf("/editor") !== -1){
            // Then populate emtpy editor
            if (document.querySelector(".editor")){
                window.view = await new EditorView(document.querySelector(".editor"), {
                    state : EditorState.create({
                        doc: DOMParser.fromSchema(mySchema).parse(document.querySelector(".editor-content")),
                        plugins: exampleSetup({schema: mySchema})
                    })
                })
            }

            if (document.querySelector(".save-button")){
                document.querySelector(".save-button").addEventListener('click', () => {
                    saveClickFunc(id, {}, 0);
                });
            }
        }
    }
}
