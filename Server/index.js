const express = require('express'); 
const morgan = require('morgan'); 
const authMiddleware = require('./middleware/authMiddleware');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');

//Dotenv
dotenv.config();

//database connection
require('./libs/dbConnect');

//rest objects
const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//routes
app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/api/v1/tasks', require('./routes/taskRoutes'));
app.use('/api/v1/equipment', require('./routes/equipmentRoutes'));
app.use('/api/v1/project', require('./routes/projectRoutes'));
app.use('/api/v1/sanction', require('./routes/sanctionRoutes'));

//routes
app.get('/', (req, res) => {
  res.status(200).json({message: 'Welcome to the Chantier Backend API'});
});

app.get('*', (req, res) => {
    res.status(404).render('index', { message: 'Not Found' });
});

//Port
const PORT = process.env.PORT || 3000;

//listen
app.listen(PORT, () => { 
    console.log(`Server is running on port: ${PORT}`.bgGreen.white);
});