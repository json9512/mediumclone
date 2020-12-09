import Model from '../models/model';
import { isString } from '../utils/helper';

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

const extractContentAndImage = (item) => {
    let content = []
    let image = {}
    item.document.doc.content.forEach((node) =>{
        // If node has a text extract it
        if ((node.type === 'paragraph' || node.type === 'heading') && node.content){
            node.content.map(item => {
                if (isString(item.text)){
                    content.push(item.text)
                }else if (item.type && item.type === 'image'){
                    image = image ? item.attrs : image;
                }
            })
        }
    })

    return {content: content, image: image}
}

const extractDataForPug = (data) => {

    if (data.rowCount > 0){
        let arr = [];
        // Potential room for improvement here n^3 time complexity
        data.rows.forEach((item) => {
            let temp = {};
            // Extract id, username, doc.content, created_at
            
            let data = extractContentAndImage(item);
            
            // Create json to store data
            let tempDescr = data.content.slice(1, data.content.length < 3? data.content.length : 3)
            tempDescr.push(" . . .")
            temp = {
                id: item.id,
                username: item.username,
                title: data.content[0],
                description: tempDescr.join(''),
                created_at: item.created_at,
                img: item.image ? item.image : '/images/profile/r2.png',
                content_img: data.image && data.image.src 
                    ? data.image.src 
                    : '/images/profile/white.PNG'
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