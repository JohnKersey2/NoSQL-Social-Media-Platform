const router = require('express').Router();
const {
  getThought,
  getSinglethought,
  createThought,
  deleteThought,
  updateThought,
  addReaction,
  removeReaction, 
  removeThought
} = require('../../controller/thoughtcontroller');

router.route('/').get(getThought).post(createThought);

router
  .route('/:id')
  .get(getSinglethought)  
  .delete(deleteThought);

router.route("/addReaction/:thoughtId").put(addReaction);

router.route("/removeReaction/:thoughtId/:reactionId").delete(removeReaction);

router.route("/:userId/thoughts/:thoughtId").delete(removeThought);

router.route("/:id/thoughts").put(updateThought);

module.exports = router;