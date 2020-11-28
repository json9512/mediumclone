import express from 'express';
import {indexPage, messagesPage, addMessage} from '../controllers';
import {modifyMessage, performAsyncFunc} from '../middleware';
const router = express.Router();

/* GET home page. */
router.get('/', indexPage);
router.get('/messages', messagesPage);
router.post('/messages', modifyMessage , performAsyncFunc, addMessage);

export default router;
