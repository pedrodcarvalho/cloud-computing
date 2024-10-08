const User = require('../models/user');

const getUsername = async (req, res) => {
  try {
    const { username } = req.user.data;
    res.status(200).json({ username });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { username } = req.body;

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    await User.updateOne({ _id: req.user.data._id }, { username });
    res.status(200).json({ message: 'Username updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsername,
  updateUser,
};
