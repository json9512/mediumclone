import express from 'express';
import {editorPage, addPost} from '../controllers';

const router = express.Router();

/* GET home page. */
router.get('/', editorPage);
router.post('/', addPost);

export default router;