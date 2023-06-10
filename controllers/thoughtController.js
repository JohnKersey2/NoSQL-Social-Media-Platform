const Thoughts = require("../models/thought");
const Users = require("../models/user");

module.exports = {
  getThought(req, res) {
    Thoughts.find()
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
      });
  },

  getSinglethought(req, res) {
    Thoughts.findOne({ _id: req.params.id })
      .select("-__v")
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: "No Thought with that ID" })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    Thoughts.create(req.body)
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  deleteThought(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.id })
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: "No thought with that ID" })
          : Users.deleteMany({ _id: { $in: thoughtData.users } })
      )
      .then(() => res.json({ message: "Thought deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  updateThought(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  removeThought(req, res) {    
    Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { thoughts: { $in: [req.params.thoughtId] } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  addReaction(req, res) {
    console.log("You are adding an reaction");
    console.log(req.body);
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body,  } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },


getReactions(req, res) {
    Thoughts.find({ _id: req.params.thoughtID }, ['reactions'])
        .then((reactions) => res.json(reactions))
        .catch((err) => res.status(500).json(err));
},

getOneReaction(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtID })
        .then((thought) => {
            var reaction = thought.reactions.filter(
                reaction => reaction.reactionId ==
                    req.params.reactionID);
            res.json(reaction)
        })
},

  removeReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No Thought found with that ID :(" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  test(req, res) {
    res.json({ message: "works" });
  }
};