const router = require('express').Router();

const {
  getAllusers,
  getusersById,
  updateusers,
  deleteusers,
  createusers,
  addFriend,
  deleteFriend,
  } = require('../controllers/users_controller');

// Set up GET all and POST at /api/users
router
  .route('/')
  .get(getAllusers)
  .post(createusers)
  .post(addFriend);

// Set up GET one, PUT, and DELETE at /api/users/:id
router
  .route('/:id')
  .get(getusersById)
  .put(updateusers)
  .delete(deleteusers)
  .delete(deleteFriend);
  
// router
//   .route('/:userId/friends/:friendId')
//   .post(addFriend)
//   .delete(deleteFriend);

module.exports = router;