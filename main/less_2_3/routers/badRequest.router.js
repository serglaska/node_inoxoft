const router = require('express').Router();

const { BED_REQUEST } = require('../configs/statusCodes.enum');

router.get('/', (req, res) => {
  res.status(BED_REQUEST).render('404');
});

module.exports = router;
