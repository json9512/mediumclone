import {EditorState} from 'prosemirror-state';
import {EditorView} from 'prosemirror-view';
import {Schema, DOMParser} from 'prosemirror-model';
import {schema} from 'prosemirror-schema-basic';
import {addListNodes} from 'prosemirror-schema-list';
import {exampleSetup} from 'prosemirror-example-setup';
import axios from 'axios';

/**Editor */
const mySchema = new Schema({
    nodes : addListNodes(schema.spec.nodes, "paragraph block*", "block"),
    marks: schema.spec.marks
});

window.view = new EditorView(document.querySelector(".editor"), {
    state : EditorState.create({
        doc: DOMParser.fromSchema(mySchema).parse(document.querySelector(".editor-content")),
        plugins: exampleSetup({schema: mySchema})
    }),
    //  editable: false
    
})

//Render test
axios.post("http://localhost:3000/editor/id", {
    id: 1
}).then((res) => {
    console.log(res)
}).catch((err) => {
    console.log(err)
})


/**
 * Saves the current state to the database
 */
const saveClickFunc = () => {
    // Get info 
    const document = window.view.state.toJSON();
    const comments = {test: "comments"};
    const likes = 2;
    const id = 2; // This will come from myposts it can also be none if this is created from scratch
    axios.post("http://localhost:3000/editor", {
        id, document, comments, likes
    }).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    })

}

document.querySelector(".save-button").addEventListener('click', () => {
    saveClickFunc();
});

