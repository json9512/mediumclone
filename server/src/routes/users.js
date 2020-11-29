import express from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  const {_raw, _json, ...userProfile} = req.user;
  res.status(200).send({message: 'respond with a resource', userProfile: userProfile});
});

export default router;
