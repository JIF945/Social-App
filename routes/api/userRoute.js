// controller functions
const router = require('express').Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/
router
.route('/')
.get(getAllUsers)
.post(createUser);

// /api/user/:userId
router
.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

// /api/users/:userId/friend
router
.route('/:userId/friend/:friendId')
.post(addFriend);


// /api/users/:userId/friends/:friendId
router
.route('/:userId/friends/:friendId')
.delete(removeFriend);

module.exports = router;