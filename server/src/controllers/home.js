import Model from '../models/model';
import { isString } from '../utils/helper';
import fs  from 'fs';
import path from 'path';

const postsModel = new Model('posts');

export const indexPage = async (req, res) => {
    let finalJson = {};

    let trending = await getTrendingPosts();
    let randomPosts = await getRandomPosts();

    finalJson = {
        trending,
        randomPosts
    }
    return res.render('home', {title: "M-Clone", data: finalJson})
}

const getRandomImage = (name, withAuthor=false) => {
    let files = fs.readdirSync(name);
    let filename = files[Math.floor(Math.random() * files.length)];
    let creator = ""
    if (withAuthor){
        let temp = filename.split(" ")
        creator += temp[0] + " " + temp[1] + " from Unsplash"
    }
    return {filename, creator}
}

const extractDataForPug = (data) => {

    if (data.rowCount > 0){
        let arr = [];
        // Potential room for improvement here n^3 time complexity
        data.rows.forEach((item) => {
            let temp = {};
            // Extract id, username, doc.content, created_at
            let content = []
            item.document.doc.content.forEach((node) =>{
                // If node has a text extract it
                if (node.type === 'paragraph' || node.type === 'heading'){
                    if (node.content){
                        node.content.map(item => {
                            if (isString(item.text)){
                                content.push(item.text)
                            }
                        })
                    }
                }
            })

            // Create json to store data
            let tempDescr = content.slice(1, content.length < 3? content.length : 3)
            tempDescr.push(" . . .")
            temp = {
                id: item.id,
                username: item.username,
                title: content[0],
                description: tempDescr.join(''),
                created_at: item.created_at,
                img: getRandomImage('./src/public/images/profile'),
                content_img: getRandomImage('./src/public/images/background', true)
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