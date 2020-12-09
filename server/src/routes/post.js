import express from 'express';
import {postPage, getPostWithID,getPostByTag, listPosts} from '../controllers';

const router = express.Router();

/* GET home page. */
router.get('/', postPage);
router.post('/id', getPostWithID);
router.post('/tag', getPostByTag);
router.post('/list', listPosts)

export default router;