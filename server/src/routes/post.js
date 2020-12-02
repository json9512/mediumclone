import express from 'express';
import {postPage, getPostWithID} from '../controllers';

const router = express.Router();

/* GET home page. */
router.get('/', postPage);
router.post('/id', getPostWithID);

export default router;