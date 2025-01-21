const { Schema, model} = require('mongoose');

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'supervisor', 'worker'], required: true },
    createdAt: {type: Date, default: Date.now },
})

const User = model('User', UserSchema);

module.exports = User;
  

