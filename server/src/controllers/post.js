import Model from '../models/model';
import {removeDuplicates, extractDataForPug} from '../utils/helper';

const postsModel = new Model('posts');

export const postPage = (req, res) => {
    
    return res.render('post', {title: "Post | O d i u m"})
}

const checkTag = async(tag, results) => {
    const result = await postsModel.select('*', ` WHERE position($1 in tags ) > 0;`, [tag]);
    if (result.rowCount > 0){
        results.push(...result.rows)
    }
}

const sendResponse = (res, render, results) => {
    if (render){
        res.status(200).render('list', {title: 'Posts | O d i u m',result: results})
    }else{
        res.status(200).json({result: results})
    }
}


export const getPostWithID = async (req, res) => {
    // User might not be present -> user not logged in from frontend
    let user = "none";
    if (req.user){
        user = req.user._json.nickname ? req.user._json.nickname : "none";
    }

    const {id} = req.body;
    
    try {
        const result = await postsModel.select('*', ` WHERE id = $1`, [id]);
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

export const getPostByTag = async(req, res) => {
    // Different based on POST and GET
    const render = req.method === "POST" ? false : true;
    let id = req.body.id;
    let tags = "";

    // Extract tags based on HTTP method
    if (render){
        tags = req.query.tag;

    }else{
        tags = req.body.tags;
    }

    let arr = tags.includes(",") ? tags.split(",") : [];

    try{
        let results = []
        if (arr.length > 0){
            for (let tag of arr){
                await checkTag(tag, results)
            }
            
        }else{
            await checkTag(tags, results)
        }
        
        results = removeDuplicates(results, parseInt(id))
        results = extractDataForPug({rowCount: results.length, rows: results})


        sendResponse(res, render, results);

    }catch (err){
        console.log(err)
        res.status(500).json({error: "Data not found"})
    }
}

export const retrieveAllPosts = async(req, res) => {
    const {id} = req.body
    const render = req.method === "POST" ? false : true
    try{
        const q = await postsModel.select("*")
        if (q.rowCount > 0){
            let results = q.rows;
            
            results = removeDuplicates(results, parseInt(id))
            results = extractDataForPug({rowCount: results.length, rows: results})
            sendResponse(res, render, results);
            return;
        }
        throw "No posts"
    }catch (err) {
        console.log(err)
        res.status(500).json({error: "Data fetch failed"})
    }
}

export const getPostByAuthor = async (req, res) => {
    const author = req.query.name
    try{
        const q = await postsModel.select("*", ` WHERE username=$1`, [author])
        if (q.rowCount > 0){
            let results = q.rows;
            
            results = removeDuplicates(results, "none")
            results = extractDataForPug({rowCount: results.length, rows: results})
            
            res.status(200).render('list', {title: 'Posts | O d i u m', result: results})
            
            return;
        }
        throw "No posts"
    }catch (err) {
        console.log(err)
        res.status(500).json({error: "Data fetch failed"})
    }
}