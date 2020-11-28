import axios from 'axios';

export const performAsyncFunc = async (req, res, next) => {
    try{
        await axios.get('https://www.google.com');
        next();
    } catch (err) {
        next(err);
    }
}