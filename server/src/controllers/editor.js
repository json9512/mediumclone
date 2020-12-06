import Model from '../models/model';

const postsModel = new Model('posts');

export const editorPage = (req, res) => {
    

    return res.render('editor', {title: "Editor | M-Clone"})
}


export const addPost = async (req, res) => {
    const username = req.user._json.nickname;
    const {id, document, comments, likes} = req.body;

    if (typeof document !== 'object' || typeof comments !== 'object' || typeof likes !== 'number') {
        res.status(500).json({error: "Given input not valid"})
        return;
    }

    let columns = "";
    let values = "";
    // Check if id exists
    // if id is none -> create new data
    
    if (id === "none"){
        columns = 'username, document, comments, likes';
        values = `'${username}', '${JSON.stringify(document)}', '${JSON.stringify(comments)}', '${likes}'`;
    }else{
        res.status(500).json({error: "Given input not valid"})
        return;
    }

    try{
        const data = await postsModel.insertWithReturn(columns, values);
        // If result does not contain a document key -> HTTP 400 error
        if (data && data.rows){
            res.status(201).json({result: data.rows});
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Error saving data to database"});
    };

};

export const updatePost = async (req, res) => {
    const username = req.user._json.nickname;
    const {id, document, comments, likes} = req.body;

    if (typeof document !== 'object' || typeof comments !== 'object' || typeof likes !== 'number') {
        res.status(500).json({error: "Given input not valid"})
        return;
    }

    let columns = "";
    let values = "";
    // Check if id exists
    if (id !== "none"){
        columns = 'id, username, document, comments, likes';
        values = `'${id}', '${username}', '${JSON.stringify(document)}', '${JSON.stringify(comments)}', '${likes}'`;

        try{
            const data = await postsModel.updateData(columns, values);
            
            // If result does not contain a document key -> HTTP 500 error
            if (!("document" in data.rows[0])){
                res.status(500).json({error: "Error updating data to database"});
            }else{
                res.status(200).json({result: data.rows});
            }
        } catch (err) {
            //console.log(err)
            res.status(500).json({error: "Error updating data to database"});
        };

    }else{
        res.status(500).json({error: "Error updating data to database"});;
    }
}

export const deletePost = async (req, res) => {
    const username = req.user._json.nickname;
    const {id} = req.body;

    if (typeof id !== 'number') {
        res.status(500).json({error: "Given input not valid"})
        return;
    }

    if (id !== "none"){
        try{
            const check = await postsModel.select('COUNT(id)', ` WHERE username='${username}' AND id='${id}';`)
            if (check.rowCount > 0){
                const data = await postsModel.dropRowWithId('id', id)
                if (data.rowCount == 1){
                    res.status(200).json({message: "Post deleted"})
                }else{
                    res.status(500).json({error: `Error deleting post with ${id}, ${username} from database`})
                }
            }else{
                throw `Error deleting data with ${id} from database`;
            }
            
            
        }catch (err) {
            console.log(err)
            res.status(500).json({error: "Error deleting data from database"})
        }
    }
}
