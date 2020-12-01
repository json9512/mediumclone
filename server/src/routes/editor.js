import express from 'express';
import {editorPage, addPost, getPostWithID} from '../controllers';

const router = express.Router();

/* GET home page. */
router.get('/', editorPage);
router.post('/', addPost);
router.post('/id', getPostWithID);

export default router;