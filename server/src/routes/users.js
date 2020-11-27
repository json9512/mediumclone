import express from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.status(200).send({message: 'respond with a resource'});
});

export default router;
