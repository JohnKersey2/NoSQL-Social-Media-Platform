const router = require('express').Router();
const {
  getAllusers,
  getSingleuser,
  createUser,
  updateUser,
  deleteUser,
  createFriend,
  deleteFriend
} = require('../../controllers/userController');

router.route("/").get(getAllusers).post(createUser);

router.route("/:userId").get(getSingleuser).delete(deleteUser);

router.route("/updateUser/:userId").put(updateUser);

router.route("/:userId/friends/:friendId").post(createFriend);

router.route("/:userId/friends/:friendId").delete(deleteFriend);

module.exports = router;