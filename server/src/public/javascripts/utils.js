'use strict';

// Import necessary modules
import {EditorState} from 'prosemirror-state';
import {EditorView} from 'prosemirror-view';
import {Schema, DOMParser} from 'prosemirror-model';
import {schema} from 'prosemirror-schema-basic';
import {addListNodes} from 'prosemirror-schema-list';
import {exampleSetup} from 'prosemirror-example-setup';
import axios from 'axios';
import {
    URL, 
    displayModal, 
    attachEditButton, 
    attachSupplementaryUI
} from './helper';

// Export schema object for prosemirror editor
export const mySchema = new Schema({
    nodes : addListNodes(schema.spec.nodes, "paragraph block*", "block"),
    marks: schema.spec.marks
});

/**
 * Retrieve the post ID from the URL
 * 
 * @param {string} substring - current URL endpoint. eg. post?id= editor?id= 
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

/**
 * Either Save or Update the post with given data
 * 
 * @param {function} func - axios function call: POST || PUT 
 * @param {number} id - post id
 * @param {object} document - post document
 * @param {object} comments - post comments
 * @param {number} likes - post likes
 * @param {string} endpoint - API endpoint to hit
 */
const saveOrUpdate = (func, id, document, comments, likes, tags, endpoint) => {

    func(`${URL}${endpoint}`, {
        id, document, comments, likes, tags
    }).then((res) => {
        //console.log(res);
        displayModal("Save complete", "success", [() => {window.location.href = `${URL}myposts`}])
    }).catch((err) => {
        //console.log(err);
        displayModal("Save failed", "error", [() => {
            window.location.href = window.location.href.split(":3000")[0] + ":3000/";
        }])
    })
}

export const extractTags = (className='.tag-container') => {
    let tagContainer = document.querySelector(className)
    tagContainer = tagContainer.children ? tagContainer.children : []
    let stringified = ""
    for (const item of tagContainer){
        stringified += item.innerHTML + ","
    }
    stringified = stringified !== "," ? stringified.slice(0, -1) : null

    return stringified
}

/**
 * Save function to run when "Save" button is clicked
 * 
 * @param {number} id 
 * @param {object} comments 
 * @param {number} likes 
 */
export const saveClickFunc = (id, comments, likes) => {
    // Reset likes to 0 if undefined
    if (likes === undefined || likes === null || likes === {}){
        likes = 0;
    }
    // Get editor information and turn into JSON 
    const document = window.view.state.toJSON();
    console.log(document)
    if (((document.doc.content[0].type === 'paragraph')
        || document.doc.content[0].type === 'heading'
        || document.doc.content[0].type === 'text' )
        && !document.doc.content[0].content){
            displayModal("You can't leave the first line blank", "error", [() => {}])
            return;
        }

    // Extract tags
    const tags = extractTags()
    
    if (id === "none"){
        // Create new post
        saveOrUpdate(axios.post, id, document, comments, likes, tags, "editor")
    }else{
        // Update exists post
        saveOrUpdate(axios.put, id, document, comments, likes, tags, "editor/update")
    } 

}

/**
 * Helper functions for load editor
 */

/**
 * Return data with given id from database
 * 
 * @param {number} id - post id
 */
const loadData = async(id) => {
    return await axios.post(`${URL}post/id` , {id: id})
}

/**
 * Show alert(error) message when condition is fullfilled
 * Redirect to origin afterwards
 * 
 * @param {boolean} condition 
 * @param {string} message 
 */
const displayErrorAndReturn = (condition, message) => {
    if (condition) {
        alert(message)
        window.location.href = window.location.href.split(":3000")[0] + ":3000/";
        return true;
    }
    return false;
}

/**
 * Attach editor with predefined data and conditions on the given classTag
 * 
 * @param {string} classTag - HTML classname
 * @param {object} document_data - post data
 * @param {boolean} editable - boolean to indicate if content is editable
 * @param {object} schema - schema for editor
 */
const attachEditor = (classTag, document_data, editable, schema) => {
    // Get content of the post
    if (document.querySelector(`${classTag}`)){
        window.view = new EditorView(document.querySelector(`${classTag}`), {
            state : EditorState.create({
                doc: schema.nodeFromJSON(document_data),
                plugins: exampleSetup({schema: schema})
            }),
            editable: () => {return editable}
            
        })
    }
}

/**
 * Create new Editor component and attach to page
 * 
 * @param {number} id 
 */
const createNewEditor = (id) => {
    // Then populate emtpy editor
    if (document.querySelector(".editor")){
        window.view = new EditorView(document.querySelector(".editor"), {
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

/**
 * [Load || Create new] Editor depending on post id and page location
 * 
 * @param {number} id - post id
 * @param {string} classTag - HTML classname to indicate current page location
 */
export const loadEditor = async (id, classTag) => {
    // Initialize variables
    let dataObj = "";
    let comments = "";
    let likes = 0;
    let editable = true;
    let tags = "";
    let author = {};

    // if id is not none: Load from database else: create new Editor
    if (id !== "none"){

        // Load data to dataObj
        dataObj = await loadData(id)
        // Check if result is error
        if (displayErrorAndReturn(dataObj.data && dataObj.data.error, "Error loading post")) return;
        
        // Check if unauthorized user is trying to edit the post
        if (displayErrorAndReturn(dataObj.data.isAuthor === false && classTag === `.editor`, 
        "You do not have rights to edit this post !")) return;

        // attach edit button on post if this user is the author
        if (dataObj.data.isAuthor){
            attachEditButton(classTag, dataObj.data.result[0].id);
        }

        const item = dataObj.data.result[0]
        // Get content of the post
        author = {
            img: item.image ? item.image : null,
            username: item.username ? item.username : ""
        }
        comments = item.comments ? item.comments : {};
        likes = item.likes ? item.likes : 0;
        tags = item.tags ? item.tags : null;

        // Set the editor to disabled when this func is called from /post
        if (classTag === ".post-viewer"){
            editable = false;
        }

        // Load editor
        attachEditor(classTag, dataObj.data.result[0].document.doc, editable, mySchema);
        
        // Attach supplementary UI
        attachSupplementaryUI(classTag, id, comments, likes, tags, author)
    
    } else {
        // If id === none, it means the page is on editor
        if (window.location.href.indexOf("/editor") !== -1){
            createNewEditor(id)
        }
    }
}