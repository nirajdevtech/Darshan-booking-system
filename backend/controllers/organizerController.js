const Organizer = require('../models/Organizer');
const Temple = require('../models/Temple');
const Darshan = require('../models/Darshan');
const Booking = require('../models/Booking');

// LOGIN
exports.ologin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Organizer.findOne({ email });

        if (!user) {
            return res.json({ Status: "Fail", message: "No user found" });
        }

        if (user.password === password) {
            return res.json({
                Status: "Success",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            });
        }

        res.json({ Status: "Fail", message: "Wrong password" });

    } catch (err) {
        res.status(500).json(err);
    }
};

// SIGNUP
exports.osignup = async (req, res) => {
    const { name, email, password } = req.body;

    try {

        const existing = await Organizer.findOne({ email });

        if (existing) {
            return res.json("Already have account");
        }

        await Organizer.create({ name, email, password });

        res.json("Account created");

    } catch (err) {
        res.status(500).json(err);
    }
};

// CREATE TEMPLE
exports.createTemple = async (req, res) => {

    try {

        const temple = new Temple({
            organizerId: req.body.organizerId,
            organizerName: req.body.organizerName,
            templeName: req.body.templeName,
            location: req.body.location,
            open: req.body.open,
            close: req.body.close,
            description: req.body.description,
            templeImage: req.file ? req.file.path : ""
        });

        const saved = await temple.save();

        res.json(saved);

    } catch (err) {

        res.status(500).json(err);

    }
};

// GET TEMPLES BY ORGANIZER
exports.getTempleByOrganizer = async (req, res) => {

    try {

        const temples = await Temple.find({ organizerId: req.params.organizerId });

        res.json(temples);

    } catch (err) {

        res.status(500).json(err);

    }
};

// GET ALL TEMPLES
exports.getTemples = async (req, res) => {

    try {

        const temples = await Temple.find();

        res.json(temples);

    } catch (err) {

        res.status(500).json(err);

    }
};

// GET TEMPLE BY ID
exports.getTempleById = async (req, res) => {

    try {

        const temple = await Temple.findById(req.params.templeId);

        res.json(temple);

    } catch (err) {

        res.status(500).json(err);

    }
};

// UPDATE TEMPLE
exports.updateTemple = async (req, res) => {

    try {

        const data = {
            templeName: req.body.templeName,
            location: req.body.location,
            open: req.body.open,
            close: req.body.close,
            description: req.body.description
        };

        if (req.file) {
            data.templeImage = req.file.path;
        }

        const updated = await Temple.findByIdAndUpdate(req.params.templeId, data, { new: true });

        res.json(updated);

    } catch (err) {

        res.status(500).json(err);

    }
};

// DELETE TEMPLE
exports.deleteTemple = async (req, res) => {

    try {

        await Temple.findByIdAndDelete(req.params.id);

        res.json("Temple deleted");

    } catch (err) {

        res.status(500).json(err);

    }
};

// CREATE DARSHAN
exports.createDarshan = async (req, res) => {

    try {

        const darshan = new Darshan(req.body);

        const saved = await darshan.save();

        res.json(saved);

    } catch (err) {

        res.status(500).json(err);

    }
};

// GET DARSHANS
exports.getDarshans = async (req, res) => {

    try {

        const data = await Darshan.find();

        res.json(data);

    } catch (err) {

        res.status(500).json(err);

    }
};

// GET DARSHAN BY ORGANIZER
exports.getDarshanByOrganizer = async (req, res) => {

    try {

        const data = await Darshan.find({ organizerId: req.params.organizerId });

        res.json(data);

    } catch (err) {

        res.status(500).json(err);

    }
};

// GET ORGANIZER BOOKINGS
exports.getOrganizerBookings = async (req, res) => {

    try {

        const bookings = await Booking.find({ organizerId: req.params.userId });

        res.json(bookings);

    } catch (err) {

        res.status(500).json(err);

    }
};

// DELETE BOOKING
exports.deleteBooking = async (req, res) => {

    try {

        await Booking.findByIdAndDelete(req.params.id);

        res.json("Booking deleted");

    } catch (err) {

        res.status(500).json(err);

    }
};