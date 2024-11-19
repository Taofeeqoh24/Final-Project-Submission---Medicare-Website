//import
const db = require('../config/db');
const bcrypt = require('bcryptjs');

//user registration logic
exports.registerPatient = async (req, res) => {
    console.log('Received registration data:', req.body);
    const { first_name, last_name, email, password } = req.body;
    try{
        //check user does not exist
        const [rows] = await db.execute('SELECT * FROM patients WHERE email = ?', [email]);
        if(rows.length > 0){
            return res.status(400).json({ message: 'Patient already exists. Please proceed to login.'});
        }
        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        //insert user in db
        await db.execute('INSERT INTO patients (first_name, last_name, email, password) VALUES (?, ?, ?, ?) ', [
            first_name,
            last_name,
            email,
            hashedPassword,
        ]);
        res.status(201).json({ message: 'Patient registered successfully!'})
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: 'Server error', error })
    }
};

//patient login
exports.loginPatient = async (req, res) => {
    const { email, password } = req.body;
    console.log("Login request received:", req.body);  
    console.log("Email:", email);                      
    console.log("Password:", password); 
    try {
        const [rows] = await db.query('SELECT * FROM patients WHERE email = ?', [email]);
        console.log("Query result:", rows);

        if (rows.length === 0) {
            return res.status(400).json({ error: 'No patient found' });
        }

        const patient = rows[0];
        const passwordMatch = await bcrypt.compare(password, patient.password);

        if (!passwordMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        req.session.patientId = patient.id;
        console.log("Session set successfully:", req.session.patientId);
        res.json({ message: 'Login successful' });
        // .then(() => {
        //     res.redirect('/home')
        // })
    } catch (err) {
        console.error("Error during login:", err);
        return res.status(500).json({ error: 'Login failed' });
    }
};