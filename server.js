const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Set up EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// // MongoDB Connection

// const MONGO_HOST = process.env.MONGO_HOST;
// const MONGO_DB = process.env.MONGO_DB;
// const MONGO_USER = process.env.MONGO_USER;
// const MONGO_PASS = process.env.MONGO_PASS;

// if (!MONGO_HOST || !MONGO_DB || !MONGO_USER || !MONGO_PASS) {
//     throw new Error('MongoDB connection variables are not set in the environment variables. Please check your .env file.');
// }

// const MONGO_URI = `mongodb+srv://${encodeURIComponent(MONGO_USER)}:${encodeURIComponent(MONGO_PASS)}@${MONGO_HOST}/${MONGO_DB}?retryWrites=true&w=majority`;



// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    throw new Error('MONGO_URI is not set in the environment variables. Please check your .env file.');
}

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Define User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', userSchema, 'Users');

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/form', (req, res) => {
    res.render('form', { error: null });
});

app.post('/submit', async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.render('form', { error: 'All fields are required' });
        }

        // Create and save user to MongoDB
        const user = new User({ name, email });
        await user.save();

        res.redirect('/success');
    } catch (error) {
        console.error('Error submitting form:', error);
        res.render('form', { error: error.message });
    }
});

app.get('/success', (req, res) => {
    res.render('success');
});

// API endpoint to get all users
app.get('/api', async (req, res) => {
    try {
        const users = await User.find({});
        res.json({
            message: 'Data retrieved successfully',
            data: users,
        });
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({
            message: 'Error retrieving data',
            error: error.message,
        });
    }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
