import Model from '../models/model';
import {isString} from '../utils/helper';

const postsModel = new Model('posts');

export const myPostsPage = async (req, res) => {

    // First check if posts exists 
    let check = await postsModel.checkIfRowExists();
    let dataArr = [];

    if (check === true){
        const result = await postsModel.select('*', ` WHERE username=$1`, [req.user._json.nickname])
        // Create data for pug
        result.rows.forEach((item) => {
            const doc = item.document.doc.content;

            let words = [];
            // Check for paragraph or heading
            doc.forEach((obj) => {
                if (obj.type === "heading"){
                    if (isString(obj.content[0].text)){
                        words.push(obj.content[0].text )
                    }
                } else if (obj.type === "paragraph"){
                    if (obj.content && isString(obj.content[0].text)){
                        words.push(obj.content[0].text)
                    }
                } 
                
            });

            let tempDescr = words.slice(1, words.length < 3? words.length : 3)
            tempDescr.push(". . .")

            const temp = {
                id: item.id,
                username: item.username,
                title: words[0],
                description: tempDescr.join(''),
                updated_at : item.updated_at
            }
            dataArr.push(temp)

        });
    }
    
    return res.render('myposts',{data: dataArr, title: "My Posts | i d i o m"})
}