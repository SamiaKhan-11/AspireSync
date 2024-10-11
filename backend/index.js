// Importing express and routers
const express = require('express');
const Userrouter = require('./routers/UserRouter');
const Companyrouter = require('./routers/CompanyRouter');
const CompanyAuthrouter = require('./routers/CompanyAuthRouter');
const Interviewrouter = require('./routers/InterviewRouter');
const cors = require('cors');

// Initializing express app
const app = express();
const port = 5000;

// Middleware setup
app.use(cors({
    origin: 'http://localhost:3000'                                                         // Allowing frontend origin
}));
app.use(express.json());                                                                   // Parsing JSON request bodies

// Routes
app.use('/user', Userrouter);                                                              // User-related routes
app.use('/company', Companyrouter);                                                        // Company-related routes
app.use('/companyauth', CompanyAuthrouter);                                                        // Company-related routes
app.use('/interview', Interviewrouter);                                                    // Interview-related routes

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Off Campus Interview API');
});

// Starting the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

// Optional: Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An unexpected error occurred!' });
});
