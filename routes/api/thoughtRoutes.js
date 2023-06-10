const router = require('express').Router();
const {
  getThought,
  getSinglethought,
  createThought,
  deleteThought,
  updateThought,
  addReaction,
  getReactions,
  getOneReaction,
  removeReaction, 
  removeThought
} = require('../../controllers/thoughtController');

router.route('/').get(getThought).post(createThought);

router
  .route('/:id')
  .get(getSinglethought)  
  .delete(deleteThought);

router.route("/reaction/:thoughtId").post(addReaction);

router.route("/reaction/:thoughtID").get(getReactions)

router.route("/reaction/").get(getOneReaction)

router.route("/removeReaction/:thoughtId/:reactionId").delete(removeReaction);

router.route("/:id/delete").delete(deleteThought);

router.route("/:id/update").put(updateThought);

module.exports = router;