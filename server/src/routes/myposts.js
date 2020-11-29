import express from 'express';
import {myPostsPage} from '../controllers';

const router = express.Router();

/* GET home page. */
router.get('/', myPostsPage);

export default router;