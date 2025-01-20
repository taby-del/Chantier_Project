const User = require('../libs/models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
   const {email, password, role} = req.body;

   try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({email, password: hashedPassword, role});
      const savedUser = await user.save();
      res.status(201).json({ message: 'User created successfully', user: savedUser._id });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

exports.login = async (req, res) => {
   const {email, password} = req.body;

   try {
      const user = await User.findOne({email});
      if (!user) {
         return res.status(404).json({ error: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(401).json({ error: 'Invalid Password or email' });
      }
      
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, user: { email: user.email, role: user.role} });
   } catch (error) {
      res.status(500).json({ error: 'server error' });
   }
}