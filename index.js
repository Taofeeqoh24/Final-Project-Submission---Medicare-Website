//importing packages
const express = require('express');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patientRoutes');
//initialize
const app = express();

//set-up middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Use `secure: true` only if you have HTTPS
}));
app.use(express.static(path.join(__dirname, '/')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authRoutes);
app.use('/patients', patientRoutes);

//routes
app.get('/register', (_req, res) => {
    res.sendFile(path.join(__dirname, 'register.html'));
});

app.get('/login', (_req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/home', (_req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

app.put('/profile', (_req, res) => {
    res.sendFile(path.join(__dirname, 'profile.html'));
});

app.get('/appointments', (_req, res) => {
    res.sendFile(path.join(__dirname, 'appointment.html'));
});


//start the server
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}` );
});