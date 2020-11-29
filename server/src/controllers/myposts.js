import {testEnvVar} from '../settings';
import {generateAccessToken} from '../utils/jwt';


export const myPostsPage = (req, res) => {
    /**Create JWT token here if user is logged in
    if (req.user){
        console.log("Logged in at index")
        // JSON webtoken comes here
        const token = generateAccessToken({username: req.user._json.nickname});
        console.log(token)
        
    }*/


    return res.render('myposts',{})
}