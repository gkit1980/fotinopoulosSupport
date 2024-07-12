
// Step 3: Set up an Express server
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const morgan = require('morgan');


const PORT = process.env.PORT || 8080;


// CORS configuration
const corsOptions = {
    origin: 'https://entypafotinopoulosclient.azurewebsites.net',   // Allow this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json()); // for parsing application/json


// Choose predefined log formats such as 'tiny', 'combined', 'dev', 'short', 'common'
app.use(morgan('dev'));



const funeralRoutes = require('./controllers/funeralController.js');
const memorialRoutes = require('./controllers/memorialController.js');
const relativeRoutes = require('./controllers/relativeController.js');
const anouncementRoutes = require('./controllers/anouncementController.js');
const authenticationRoutes = require('./controllers/userController.js');
const notificationRoutes = require('./controllers/notificationController.js');

// Step 4: Connect to MongoDB

//mongodb://localhost/funeralDB
try {
    //mongoose.connect('mongodb://localhost/funeralDB');
   mongoose.connect('mongodb+srv://gkit:Stud1980!@fotinopoulos.mongocluster.cosmos.azure.com/funeralDB?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000');
} catch (error) {
    console.error('Error connecting to MongoDB:', error);
}



app.use('/funeral', funeralRoutes);
app.use('/memorial', memorialRoutes);
app.use('/relative', relativeRoutes);
app.use('/authenticate', authenticationRoutes);
app.use('/anouncement', anouncementRoutes);
app.use('/notification', notificationRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Catch unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});

// Catch uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Optionally, shut down the server gracefully
  process.exit(1); // Exit process with failure
});


// Step 7: Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));