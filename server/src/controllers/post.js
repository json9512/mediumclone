import Model from '../models/model';


const postsModel = new Model('posts');

export const postPage = (req, res) => {

    // Setup render items for "more from odium part"
    
    return res.render('post', {title: "Post | O d i u m"})
}


export const getPostWithID = async (req, res) => {
    // User might not be present -> user not logged in from frontend
    let user = "none";
    if (req.user){
        user = req.user._json.nickname ? req.user._json.nickname : "none";
    }

    const {id} = req.body;
    
    try {
        const result = await postsModel.select('*', ` WHERE id = ${id}`);
        let isAuthor = false;
        if (result.rows.length > 0){
            //Check if the author is user
            if (result.rows[0].username === user){
                isAuthor = true;
            }
            
            res.status(200).json({result: result.rows, isAuthor})
        }else{
            res.status(500).json({error: "Data not found"})
        }
    }catch (err) {
        console.log(err)
        res.status(500).json({error: "Data not found"})
    }
    
}