// controller functions
const router = require('express').Router();
const {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addUserThought,
  deleteUserThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// /api/
router
.route('/')
.get(getAllThoughts)
.post(createThought);

// /api/thoughts
// /api/thoughts/:thoughtId/
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/userId
router
.route('/:thoughtId/users/:userId')
.post(addUserThought)
.delete(deleteUserThought)

// /api/thoughts/:thoughtId/reactions
router
.route('/:thoughtId/reactions')
.post(createReaction)

router
.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction)
module.exports = router;