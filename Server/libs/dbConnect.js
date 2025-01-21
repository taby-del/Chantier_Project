const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) throw new Error('MONGODB_URI is missing');

mongoose.connect(MONGODB_URI, {
    dbName: 'chantier_project',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,
})
.then(() => { console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Error connecting to MongoDB:', err);
});
