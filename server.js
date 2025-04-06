const express = require('express'); 
const app = express(); // Create an instance of Express

const db = require('./database/db'); // Import the database connection

const bodyParser = require('body-parser'); // Import body-parser middleware
app.use(bodyParser.json()); // Parse JSON request bodies
require('dotenv').config(); // Load environment variables from .env file // Set the port from environment variable or default to 3000
const port = process.env.PORT || 5000; // Set the port from environment variable or default to 3000

app.get('/', (req, res) => {
    res.send('Welcome to my Hotel!');
});// Define a simple route for the root URL

const personRoutes = require('./routes/personRoutes'); // Import the person routes
app.use('/person', personRoutes); // Use the person routes for /person endpoint

const menuRoutes = require('./routes/menuRoutes'); // Import the MenuItem Routes
app.use('/menu', menuRoutes); // Use the menu routes for /menu endpoint

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); // Start the server on port 5000