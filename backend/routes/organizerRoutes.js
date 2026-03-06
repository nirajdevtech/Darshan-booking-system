const express = require('express');
const router = express.Router();
const organizerController = require('../controllers/organizerController');
const multer = require('multer');
const path = require('path');

// Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// AUTH
router.post('/ologin', organizerController.ologin);
router.post('/osignup', organizerController.osignup);

// TEMPLE
router.post('/createtemple', upload.single('templeImage'), organizerController.createTemple);
router.get('/gettemple/:organizerId', organizerController.getTempleByOrganizer);
router.get('/gettemples', organizerController.getTemples);
router.get('/gettemplebyid/:templeId', organizerController.getTempleById);
router.put('/updatetemple/:templeId', upload.single('templeImage'), organizerController.updateTemple);
router.delete('/templedelete/:id', organizerController.deleteTemple);

// DARSHAN
router.post('/createdarshan', organizerController.createDarshan);
router.get('/getdarshans/:organizerId', organizerController.getDarshanByOrganizer);
router.get('/getdarshans', organizerController.getDarshans);

// BOOKINGS
router.get('/getorganizerbookings/:userId', organizerController.getOrganizerBookings);
router.delete('/eventdelete/:id', organizerController.deleteBooking);

module.exports = router;