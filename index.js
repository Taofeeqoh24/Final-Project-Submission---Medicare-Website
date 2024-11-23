//importing packages
const express = require('express');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
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
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authRoutes);
app.use('/patients', patientRoutes);
app.use('/doctor', doctorRoutes);

//routes
app.get('/register', (_req, res) => {
    res.sendFile(path.join(__dirname, 'assets/html/register.html'));
});

app.get('/login', (_req, res) => {
    res.sendFile(path.join(__dirname, 'assets/html/login.html'));
});

app.get('/doctor', (_req, res) => {
    res.sendFile(path.join(__dirname, 'assets/html/doctor.html'));
});

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'assets/html/telemedicine.html'));
});

app.get('/home', (_req, res) => {
    res.sendFile(path.join(__dirname, 'assets/html/home.html'));
});

app.put('/profile', (_req, res) => {
    res.sendFile(path.join(__dirname, 'assets/html/profile.html'));
});

app.get('/appointments', (_req, res) => {
    res.sendFile(path.join(__dirname, 'assets/html/appointment.html'));
});


//start the server
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}` );
});