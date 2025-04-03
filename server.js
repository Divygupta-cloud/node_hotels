const express = require('express'); 
const app = express();

const db = require('./database/db'); // Import the database connection

const bodyParser = require('body-parser'); // Import body-parser middleware
app.use(bodyParser.json()); // Parse JSON request bodies


app.get('/', (req, res) => {
    res.send('Welcome to my Hotel!');
});

const personRoutes = require('./routes/personRoutes'); // Import the person routes
app.use('/person', personRoutes); // Use the person routes for /person endpoint

const menuRoutes = require('./routes/menuRoutes'); // Import the MenuItem model
app.use('/menu', menuRoutes); // Use the menu routes for /menu endpoint

app.listen(3000, () => {
    console.log('Server is running on port 3000');
}); // Start the server on port 3000