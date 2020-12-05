import express from 'express';
import {addLikes, checkLikes} from '../controllers';

const router = express.Router();

router.patch('/', addLikes); 

export default router;