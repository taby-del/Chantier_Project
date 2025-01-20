const express = require('express'); 
const morgan = require('morgan'); 
const authRoutes = require('./routes/authRoutes');  
const authMiddleware = require('./middleware/authMiddleware');


require('dotenv').config();
require('./libs/dbConnect');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);

app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

app.get('*', (req, res) => {
    res.status(404).render('index', { message: 'Not Found' });
});

const PORT = 3000

app.listen(PORT, () => { 
    console.log('Server is running on port 3000');
});