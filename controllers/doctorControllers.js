//import
const db = require('../config/db');
const bcrypt = require('bcryptjs');

exports.loginDoctor = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [doctor] = await db.query('SELECT * FROM doctors WHERE email = ?', [email]);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, doctor.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Set session or token
        req.session.doctorId = doctor.id; // Assuming you're using sessions
        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred' });
    }
};
