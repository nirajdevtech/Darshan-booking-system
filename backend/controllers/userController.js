const User = require('../models/User');
const Darshan = require('../models/Darshan');
const Booking = require('../models/Booking');


// ================= USER LOGIN =================
exports.ulogin = async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.json("no user");
        }

        if (user.password !== password) {
            return res.json("login fail");
        }

        res.json({
            Status: "Success",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {

        res.status(500).json({ error: err.message });

    }

};



// ================= USER SIGNUP =================
exports.usignup = async (req, res) => {

    const { name, email, password } = req.body;

    try {

        const existing = await User.findOne({ email });

        if (existing) {
            return res.json("Already have an account");
        }

        await User.create({
            name,
            email,
            password
        });

        res.json("Account Created");

    } catch (err) {

        res.status(500).json({ error: "Signup failed" });

    }

};



// ================= GET ALL USERS =================
exports.getUsers = async (req, res) => {

    try {

        const users = await User.find();

        res.json(users);

    } catch {

        res.status(500).json({ error: "Failed to fetch users" });

    }

};



// ================= GET USER BY ID =================
exports.getUserById = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        res.json(user);

    } catch {

        res.status(500).json({ error: "Failed to fetch user" });

    }

};



// ================= UPDATE USER =================
exports.updateUser = async (req, res) => {

    const { name, email, password } = req.body;

    try {

        const updated = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, password },
            { new: true }
        );

        res.json(updated);

    } catch {

        res.status(500).json({ error: "Update failed" });

    }

};



// ================= DELETE USER =================
exports.deleteUser = async (req, res) => {

    try {

        await User.deleteOne({ _id: req.params.id });

        res.json("User deleted");

    } catch {

        res.status(500).json({ error: "Delete failed" });

    }

};



// ================= GET DARSHAN =================
exports.getDarshanById = async (req, res) => {

    try {

        const darshan = await Darshan.findById(req.params.id);

        res.json(darshan);

    } catch (err) {

        res.status(500).json({ error: err.message });

    }

};



// ================= CREATE BOOKING =================
exports.createBooking = async (req, res) => {

    try {

        const booking = new Booking(req.body);

        await booking.save();

        res.status(201).json(booking);

    } catch (err) {

        res.status(400).json({ error: "Failed to create booking" });

    }

};



// ================= GET BOOKINGS (FIXED) =================
exports.getBookingsByUser = async (req, res) => {

    try {

        // Return ALL bookings so MyBookings page works
        const bookings = await Booking.find().sort({ _id: -1 });

        res.json(bookings);

    } catch {

        res.status(500).json({ error: "Failed to fetch bookings" });

    }

};



// ================= GET ALL BOOKINGS (ADMIN) =================
exports.getAllBookings = async (req, res) => {

    try {

        const bookings = await Booking.find().sort({ _id: -1 });

        res.json(bookings);

    } catch {

        res.status(500).json({ error: "Failed to get bookings" });

    }

};



// ================= DELETE BOOKING =================
exports.deleteBooking = async (req, res) => {

    try {

        await Booking.deleteOne({ _id: req.params.id });

        res.json("Booking deleted");

    } catch {

        res.status(500).json({ error: "Delete booking failed" });

    }

};