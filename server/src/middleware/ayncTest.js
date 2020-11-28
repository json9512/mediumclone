import axios from 'axios';

export const performAsyncFunc = async (req, res, next) => {
    try{
        await axios.get('https://picsum.photos/id/0/info');
        next();
    } catch (err) {
        next(err);
    }
}