import Model from '../models/model';
import {extractDataForPug } from '../utils/helper';

const postsModel = new Model('posts');

export const indexPage = async (req, res) => {
    let finalJson = {};

    let trending = await getTrendingPosts();
    let randomPosts = await getRandomPosts();

    finalJson = {
        trending,
        randomPosts
    }
    
    return res.render('home', {title: "O d i u m", data: finalJson})
}

const getTrendingPosts = async () => {
    const data =  await postsModel.select('*', ' ORDER BY likes DESC LIMIT 6;')
    return extractDataForPug(data)
}

const getRandomPosts = async () => {
    const data = await postsModel.select('*', ' ORDER BY RANDOM() LIMIT 20;')
    return extractDataForPug(data);
}