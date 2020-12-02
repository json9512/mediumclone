import Model from '../models/model';
import {isString} from '../utils/helper';

const postsModel = new Model('posts');

export const myPostsPage = async (req, res) => {

    // First check if posts exists for this usersname
    let check = await postsModel.checkIfRowExists();
    let dataArr = [];

    if (check === true){
        const result = await postsModel.select('*', ` WHERE username='${req.user._json.nickname}'`)
        // Create data for pug
        result.rows.forEach((item) => {
            const doc = item.document.doc.content;

            let words = [];
            // Check for paragraph or heading
            doc.forEach((obj) => {
                if (obj.type === "paragraph"){
                    if (obj.content && isString(obj.content[0].text)){
                        words.push(obj.content[0].text)
                    }
                }else if (obj.type === "heading"){
                    if (isString(obj.text)){
                        words.push(obj.text )
                    }
                }
            });

            const temp = {
                id: item.id,
                username: item.username,
                title: words[0],
                description: words.slice(1, words.length),
                updated_at : item.updated_at
            }
            dataArr.push(temp)

        });
    }
    
    return res.render('myposts',{data: dataArr})
}