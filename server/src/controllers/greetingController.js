const Greeting = require('../models/greeting');

const getGreetings = async (req, res) => {
  try {
    const greetings = (await Greeting.find()).filter((greeting) => greeting.username === req.user.data.username);
    res.status(200).json({ greetings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const setGreeting = async (req, res) => {
  try {
    const { name, email, greeting, date, id } = req.body;
    const username = req.user.data.username;
    const newGreeting = new Greeting({ name, email, greeting, date, id, username });
    await newGreeting.save();
    res.status(200).json({ message: 'Greeting added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateGreeting = async (req, res) => {
  try {
    const { id, name, email, greeting, date } = req.body;
    await Greeting.findOneAndUpdate({ id: id }, { name, email, greeting, date });
    res.status(200).json({ message: 'Greeting updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteGreeting = async (req, res) => {
  try {
    const { id } = req.body;
    await Greeting.findOneAndDelete({ id: id });
    res.status(200).json({ message: 'Greeting deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getGreetings,
  setGreeting,
  updateGreeting,
  deleteGreeting,
};
