import Model from '../models/model';
import { isString } from '../utils/helper';
import fs  from 'fs';
import path from 'path';

const postsModel = new Model('posts');

export const indexPage = async (req, res) => {
    let finalJson = {};

    const trending = await getTrendingPosts();
    const randomPosts = await getRandomPosts();
    

    finalJson = {
        trending,
        randomPosts
    }

    return res.render('home', {title: "M-Clone", data: finalJson})
}

const getRandomAuthorImage = () => {
    let files = fs.readdirSync('./src/public/images/profile');
    return files[Math.floor(Math.random() * files.length)];
}

const extractDataForPug = (data) => {

    if (data.rowCount > 0){
        let arr = [];
        data.rows.forEach((item) => {
            let temp = {};
            // Extract id, username, doc.content, created_at
            let content = []
            item.document.doc.content.forEach((node) =>{
                // If node has a text extract it
                if (node.type === 'paragraph' || node.type === 'heading'){
                    if (node.content){
                        if (isString(node.content[0].text)){
                            content.push(node.content[0].text)
                        }
                    }
                }
            })

            // Create json to store data
            temp = {
                id: item.id,
                username: item.username,
                title: content[0],
                description: content.slice(1, content.length),
                created_at: item.created_at,
                img: getRandomAuthorImage()
            }

            arr.push(temp)
        })

        return arr;

    }else{
        console.log("No posts");
        return null;
    }

}

const getTrendingPosts = async () => {
    const data =  await postsModel.select('*', ' ORDER BY likes DESC LIMIT 6;')
    return extractDataForPug(data)
}

const getRandomPosts = async () => {
    const data = await postsModel.select('*', ' ORDER BY RANDOM() LIMIT 20;')
    return extractDataForPug(data);
}