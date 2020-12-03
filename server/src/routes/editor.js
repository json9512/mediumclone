import express from 'express';
import {editorPage, addPost, deletePost} from '../controllers';

const router = express.Router();

/* GET home page. */
router.get('/', editorPage);
router.post('/', addPost);
router.post('/delete', deletePost)

export default router;