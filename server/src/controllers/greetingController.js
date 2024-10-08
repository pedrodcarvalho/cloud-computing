const Greeting = require('../models/greeting');

const getGreetings = async (req, res) => {
  try {
    const greetings = (await Greeting.find()).filter((greeting) => greeting.id === req.user.data._id);
    res.status(200).json({ greetings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const setGreeting = async (req, res) => {
  try {
    const { name, email, greeting, date } = req.body;
    const id = req.user.data._id;
    const newGreeting = new Greeting({ name, email, greeting, date, id });
    await newGreeting.save();
    res.status(200).json({ message: 'Greeting added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateGreeting = async (req, res) => {
  try {
    const { name, email, greeting, date, id } = req.body;
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
