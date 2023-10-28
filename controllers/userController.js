const User = require("../models/user.js");

module.exports = {
  // Get All users
  async getAllUsers(req, res) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({
        _id: req.params.userId,
      });
      if (!user) {
        res.status(404).json({
          message: "Unable to find user",
        });
        return;
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // update user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
  async updateUser(req, res) {
    try {
      const updateUser = await User.findOneAndUpdate(
        {
          _id: req.params.userId,
        },
        { $set: req.body },
        {
          new: true,
        }
      );
      if (!updateUser) {
        res.status(500).json({
          message: "user not available",
        });
        return;
      }
      res.json(updateUser);
    } catch (err) {
      console.log(err);
    }
  },
  //  delete new user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({
        _id: req.params.userId,
      });

      if (!user) {
        res.status(404).json({
          message: "no user exist",
        });
      }
      return;
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // add friend
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that ID :(" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
      console.log(err)
    }
  },
  // remove friend
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndRemove(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No student found with that ID :(" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
      console.log(err)
    }
  },
};
