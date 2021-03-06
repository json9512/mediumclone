import Model from '../models/model';

const postsModel = new Model('posts');


export const addLikes = async (req, res) => {

    const {id} = req.body;
    if (id === "none") {
        return res.status(500).json({error: `Post with id:${id} does not exist`})
        
    } else {
        try {
            const result = await postsModel.updateData('id, likes', `${id}, likes + 1`)
            if (!("likes" in result.rows[0])){
                return res.status(500).json({error: "Error adding like to post"})
            }else{
                return res.status(200).json({result: result.rows})
            }
        }catch (err){
            //console.log(err)
            return res.status(500).json({error: "Error adding like to post"})
        }
    }
}
