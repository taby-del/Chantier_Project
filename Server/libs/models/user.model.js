const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'please add a Name'],
    },
    email: { 
        type: String, 
        required: [true, 'please add an Email'], 
        unique: true,
    },
    password: { 
        type: String, 
        required: [true, 'please add a Password'], 
        minlength:6, 
        max: 64,
    },
    role: { 
        type: String, 
        enum: ['supervisor', 'admin', 'worker'],
        requiure: true,
        },
    salary: { 
        type: Number, 
        required: function() {
            return this.role === 'worker' || this.role === 'supervisor';
        },
        min: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now },
});


module.exports = mongoose.model('User', UserSchema);
  

