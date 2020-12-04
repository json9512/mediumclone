import express from 'express';
import {addLikes, checkLikes} from '../controllers';

const router = express.Router();

/* POST */
router.post('/', addLikes); // Change to post

export default router;