import {saveClickFunc} from './utils';

// Related to HTML element creation and attachment

// State the current URL as the server's origin address
export const URL = window.location.origin + "/";


const renderAuthorBadge = (author) => {
    const img = author.img;
    const name = author.username;

    const container = document.querySelector(".badge-container")
    const profile_image = document.createElement('img')
    profile_image.alt = "profile_img"
    profile_image.className = "badge-image"
    profile_image.src = img

    const text = document.createElement('span')
    text.className = 'badge-text'
    text.innerHTML = "Written by \n" + name

    // Follow needs to be added here if implemented
    container.appendChild(profile_image)
    container.appendChild(text)
}

const checkIfTagExists = (list, value) => {
    for (const item of list){
        if (item.innerHTML === value){
            return true
        }
    }
    return false
}

export const addTag = (tagContainer, value, canEdit=true) => {
    const tagChildren = tagContainer.children ? tagContainer.children : []

    if (!checkIfTagExists(tagChildren, value)){
        const tags = document.createElement('span')
        tags.className = "post-tag-text"
        tags.innerHTML = value
        if(canEdit){
            tags.className += '-edit'
            tags.addEventListener('click', () => {
                tagContainer.removeChild(tags)
            })
        }else{
            // Add event to -> list of posts with same tag
        }
        tagContainer.append(tags)
    }
}

const renderTags = (className, tags) => {
    if (document.querySelector(className)){
        const container = document.querySelector(className)
        const t = tags ? tags.split(",") : null
        const con = className === ".post-tag-container" ? false : true
        
        if (t !== null){
            for (const c of t){
                addTag(container, c, con)
            }
        }
    }
}

const createBasicButton = (title, type) => {
    const button = document.createElement('span')
    button.innerHTML = title
    if (type === 'decline'){
        button.className = 'modal-button-decline'
    }else{
        button.className = 'modal-button-accept'
    }
    return button
}

const createCustomizedButton = (message, type, callback, gridColumn) => {
    const basicBtn = createBasicButton(message, type)
    basicBtn.style.gridColumn = gridColumn;
    basicBtn.addEventListener('click', () => {
        document.querySelector(".modal").style.display = 'none';
        callback()
    })
    basicBtn.style.justifySelf = 'center';
    
    return basicBtn;
}


export const displayModal = (message, type, callbacks=[()=>{}]) => {
    // Get modal components
    const modal = document.querySelector(".modal");
    const buttonsContainer = document.querySelector(".modal-buttons")

    // Remove all buttons
    while (buttonsContainer.lastElementChild){
        buttonsContainer.removeChild(buttonsContainer.lastElementChild)
    }

    document.querySelector(".modal-message").innerHTML = message;

    // Show modal
    modal.style.display = 'block';

    if (type === 'confirm'){
        // Create two buttons
        const okButton = createCustomizedButton("Accept", "okay", callbacks[0], '1')
        const noButton = createCustomizedButton("Decline", "decline", callbacks[1], '2')
        buttonsContainer.appendChild(okButton)
        buttonsContainer.appendChild(noButton)

    } else if (type === 'error'){

        const errButton = createCustomizedButton("OK", "decline", callbacks[0], '1/2')
        buttonsContainer.appendChild(errButton)

    }else if (type === 'success'){
        const okayButton = createCustomizedButton("OK", "okay", callbacks[0], '1/2')
        buttonsContainer.appendChild(okayButton)
    }
}

/**
 * Create the "Edit" button on the post
 * 
 * @param {number || string} id - post id 
 */
export const createEditButton = (id) => {
    const editButton = document.createElement('span')
    editButton.className = 'edit-post-container';
    editButton.innerHTML = 'Edit';
    editButton.addEventListener('click', () => {
        window.location.href = `${URL}editor?id=${id}`
    });

    return editButton;
}

/**
 * Attach redirect on click event to relevent post with its post id
 * 
 * @param {object} item - HTML element to attach "click" event to
 * @param {number || string} id - post id 
 */
export const attachPostClicked = (item, id) => {
    item.addEventListener('click', ()=>{
        window.location.href = `${URL}post?id=${id}`;
    })
}

/**
 * Attach redirect on click event to the children of the given HTML element by its classname
 * 
 * @param {string} className - HTML element classname
 * @param {string} type - indicate the HTML container type
 */
export const attachPostClickedDynamic = (className, type) => {
    /**
     * Dynamically attach onclick events to each article post 
     * 
     * type box = only one element to add event listener
     * type other = 2 elements to add event listeners
     * */ 
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
  * Attach edit button on HTML element
  * 
  * @param {string} classTag - HTML classname
  * @param {number} id - post id
  */
 export const attachEditButton = (classTag, id) => {
    if (classTag === ".post-viewer"){
        document.querySelector(".right-main-container-editor").appendChild(createEditButton(id)) 
    }
}


/**
 * Attach additionaly HTML elements for given page
 * 
 * @param {string} classTag - HTML classname used to locate current page
 * @param {number} id - post id
 * @param {object} comments - post comments
 * @param {number} likes - post likes
 */
export const attachSupplementaryUI = (classTag, id, comments, likes, tags, author) => {
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

        renderTags('.tag-container', tags)
    }

    
    if (classTag === ".post-viewer"){
        // Populate number of likes
        const likeCounter = document.createElement("span")
        likeCounter.className = "like-counter"
        likeCounter.innerHTML = likes;
        document.querySelector(".left-main-container-editor").appendChild(likeCounter);

        renderTags('.post-tag-container', tags)
        renderAuthorBadge(author)
    }

}

export const shuffleArray =(array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

