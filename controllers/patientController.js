//import
const db = require('../config/db');

//Update Patient Profile
exports.updateProfile = async (req, res) => {
    console.log(req.body);
    const { first_name, last_name, phone } = req.body;
    const patientId = req.session.patientId;
    try{
        await db.query('UPDATE patients SET first_name = ?, last_name = ?, phone = ? WHERE id= ?', [
            first_name,
            last_name,
            phone,
            patientId
        ]);
        res.status(200).json({ message: 'Profile Updated successfully!'})
        // res.send('Patient profile retrieved successfully!');
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating profile', error })
    }
};

//Book Appointment
exports.bookAppointment = async (req, res) => {
        const { doctor_id, appointment_date, appointment_time } = req.body;
        const patientId = req.session.patientId;

        try {
            await db.query(
                'INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time) VALUES (?, ?, ?, ?)', 
                [patientId, doctor_id, appointment_date, appointment_time]
            );
        res.status(200).json({ message: 'Appointment booked successfully, We cant wait to have you!'});
        // res.json({ message: 'Appointment booked successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error booking appointment' });
    }
};

// View Appointments
exports.viewAppointments = async (req, res) => {
    const patientId = req.session.patientId;

    try {
        const [appointments] = await db.query('SELECT * FROM appointments WHERE patient_id = ?', [patientId]);
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching appointments' });
    }
};
