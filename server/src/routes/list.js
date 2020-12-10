import express from 'express';
import {retrieveAllPosts, getPostByTag, getPostByAuthor} from '../controllers';

const router = express.Router();

/* GET home page. */
router.get('/', retrieveAllPosts);
router.get('/tags', getPostByTag);
router.get('/author', getPostByAuthor);

export default router;