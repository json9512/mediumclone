import express from 'express';
import {postPage, getPostWithID,getPostByTag, retrieveAllPosts} from '../controllers';

const router = express.Router();

/* GET home page. */
router.get('/', postPage);
router.post('/id', getPostWithID);
router.post('/tag', getPostByTag);
router.post('/list', retrieveAllPosts);

export default router;