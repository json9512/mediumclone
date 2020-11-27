import express from 'express';
import {indexPage, messagesPage, addMessage} from '../controllers';
const router = express.Router();

/* GET home page. */
router.get('/', indexPage);
router.get('/messages', messagesPage);
router.post('/messages', addMessage);

export default router;
