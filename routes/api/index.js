const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

router.use('/users', friendRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;