const Users  = require('../models/user');
const Thought = require('../models/thought');

module.exports = {
    getAllusers(req, res) {
      Users.find()
        .then((userData) => res.json(userData))
        .catch((err) => res.status(500).json(err));
    },   
    getSingleuser(req, res) {
      console.log(req)
      Users.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate("thoughts")
        .then((userData) =>          
          res.status(200).json(userData)
    )
        .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
      Users.create(req.body)
        .then((userData) => res.json(userData))
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    deleteUser(req, res) {
      Users.findOneAndDelete({ _id: req.params.userId })
        .then((userData) =>
          !userData
            ? res.status(404).json({ message: 'No user with that ID' })
            : Users.findOneAndRemove({ _id: { $in: userData } })
        )
        .then(() => res.json({ message: 'User deleted!' }))
        .catch((err) => res.status(500).json(err));
    },   
    updateUser(req, res) {
        Users.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((userData) =>
          !userData
            ? res.status(404).json({ message: 'No user with this id!' })
            : res.json(userData)
        )
        .catch((err) => res.status(500).json(err));
    },
    createFriend(req, res) {
      Users.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res.status(404).json({ message: "No User with that ID" })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    deleteFriend(req, res) {
      Users.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: { $in: [req.params.friendId] } } },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res.status(404).json({ message: "No user found with that ID :(" })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    }
  };