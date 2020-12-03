import {testEnvVar} from '../settings';
import Model from '../models/model';

const postsModel = new Model('posts');

export const editorPage = (req, res) => {
    

    return res.render('editor', {title: testEnvVar})
}


export const addPost = async (req, res) => {
    const username = req.user._json.nickname;
    const {id, document, comments, likes} = req.body;

    let columns = "";
    let values = "";
    // Check if id exists
    // if id is none -> create new data
    let createNew = false;
    if (id === "none"){
        createNew = true;
        columns = 'username, document, comments, likes';
        values = `'${username}', '${JSON.stringify(document)}', '${JSON.stringify(comments)}', '${likes}'`;
    }else{
        columns = 'id, username, document, comments, likes';
        values = `'${id}', '${username}', '${JSON.stringify(document)}', '${JSON.stringify(comments)}', '${likes}'`;
    }

    try{
        const data = await postsModel.insertWithReturn(columns, values, createNew);
        if (data.code){
            res.status(data.code).json({result: data.rows});
        }else{
            res.status(200).json({result: data.rows});
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({result: "Error saving data to database"});
    };

};

export const deletePost = async (req, res) => {
    const username = req.user._json.nickname;
    const {id} = req.body;

    if (id !== "none"){
        try{
            const check = await postsModel.select('COUNT(id)', ` WHERE username='${username}' AND id='${id}';`)
            if (check.rowCount > 0){
                const data = await postsModel.dropRowWithId('id', id)
                res.status(200).json({result: data.rows})
            }else{
                res.status(400).json({result: `Error deleting post with ${id}, ${username} from database`})
            }
            
        }catch (err) {
            console.log(err)
            res.status(400).json({result: "Error deleting data from database"})
        }
    }
}
