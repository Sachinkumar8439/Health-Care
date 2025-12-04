const User = require('../models/User');
const ActivityLog = require('../models/ActivityLog');
const Reminder = require('../models/Reminder');

exports.getPatients = async(req, res) => {
    try {
        const patients = await User.find({ role: 'patient' }).select('name email age');
        res.json(patients);
    } catch (err) {
        console.error('getPatients error', err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getPatientCompliance = async(req, res) => {
    const patientId = req.params.id;
    try {
        const logs = await ActivityLog.find({ userId: patientId }).sort({ date: -1 }).limit(30);
        res.json({ history: logs });
    } catch (err) {
        console.error('getPatientCompliance error', err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createReminder = async(req, res) => {
    const patientId = req.params.id;
    const { title, description, dueDate } = req.body;
    try {
        const reminder = await Reminder.create({
            userId: patientId,
            title,
            description,
            dueDate,
            createdBy: req.user._id
        });
        res.json(reminder);
    } catch (err) {
        console.error('createReminder error', err);
        res.status(500).json({ message: 'Server error' });
    }
};