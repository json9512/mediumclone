import express from 'express';
import {indexPage, messagesPage} from '../controllers';
const router = express.Router();

/* GET home page. */
router.get('/', indexPage);
router.get('/messages', messagesPage);

export default router;
