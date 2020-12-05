import express from 'express';
import {indexPage} from '../controllers';
const router = express.Router();

/* GET home page. */
router.get('/', indexPage);

export default router;
