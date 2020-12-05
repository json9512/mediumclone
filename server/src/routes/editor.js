import express from 'express';
import {editorPage, addPost, updatePost, deletePost} from '../controllers';

const router = express.Router();

/* GET home page. */
router.get('/', editorPage);
router.post('/', addPost);
router.put('/update', updatePost);
router.delete('/delete', deletePost)

export default router;