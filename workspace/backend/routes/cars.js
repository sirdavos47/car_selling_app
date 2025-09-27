const express = require('express');

const Car = require('../models/Car');
const auth = require('../utils/authMiddleware');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

const router = express.Router();

// List all cars
router.get('/', async (req, res) => {
  const cars = await Car.find().populate('seller', 'name email');
  res.json(cars);
});

// Get car by id
router.get('/:id', async (req, res) => {
  const car = await Car.findById(req.params.id).populate('seller', 'name email');
  if (!car) return res.status(404).json({ message: 'Car not found' });
  res.json(car);
});

// Create car with image upload
router.post('/', auth, upload.single('image'), async (req, res) => {
  const carData = { ...req.body, seller: req.user.userId };
  if (req.file) {
    carData.image = `/uploads/${req.file.filename}`;
  }
  const car = new Car(carData);
  await car.save();
  res.status(201).json(car);
});

// Update car
router.put('/:id', auth, async (req, res) => {
  const car = await Car.findOneAndUpdate({ _id: req.params.id, seller: req.user.userId }, req.body, { new: true });
  if (!car) return res.status(404).json({ message: 'Car not found or unauthorized' });
  res.json(car);
});

// Delete car
router.delete('/:id', auth, async (req, res) => {
  const car = await Car.findOneAndDelete({ _id: req.params.id, seller: req.user.userId });
  if (!car) return res.status(404).json({ message: 'Car not found or unauthorized' });
  res.json({ message: 'Car deleted' });
});

module.exports = router;
