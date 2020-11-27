import express from 'express';
import {testEnvVar} from '../settings';
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.status(200).send({ title: testEnvVar });
});

export default router;
