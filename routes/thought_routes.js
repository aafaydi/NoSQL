const router = require('express').Router();

const {
  getAllthought,
  getthoughtById,
  createthought,
  updatethought,
  deletethought,
  addReaction,


} = require('../controllers/thoughts_controller');

// Set up GET all and POST at /api/thoughts
router
  .route('/')
  .get(getAllthought)
  .post(createthought)
  .post(addReaction);

// Set up GET one, PUT, and DELETE at /api/thoughts/:id
router
  .route('/:id')
  .get(getthoughtById)
  .put(updatethought)
  .delete(deletethought)

// Post at /api/thoughts/:thoughtId/reactions
// router
//   .route('/:thoughtId/reactions')
//   .post(createReaction);

//   router
//   .route('/:thoughtId/reactions/:reactionId')
//   .delete(deleteReaction);

module.exports = router;