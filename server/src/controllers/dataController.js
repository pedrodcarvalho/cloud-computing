const getUsername = async (req, res) => {
    try {
        const { username } = req.user.data;
        res.status(200).json({ username });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUsername,
};
