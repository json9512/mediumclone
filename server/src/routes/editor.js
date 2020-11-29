import express from 'express';
import {editorPage} from '../controllers';

const router = express.Router();

/* GET home page. */
router.get('/', editorPage);

export default router;