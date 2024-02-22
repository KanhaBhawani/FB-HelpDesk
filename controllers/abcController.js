// controllers/authController.js

exports.go = async (req, res) => {
    res.sendFile('D:\\Code\\Web Dev\\0. Assignments\\Richpanel\\index.html')
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).send("Invalid email or password");
    }

    const accessToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
    res.json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
