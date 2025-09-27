const express = require('express');
const Car = require('../models/Car');
const auth = require('../utils/authMiddleware');

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

// Create car
router.post('/', auth, async (req, res) => {
  const car = new Car({ ...req.body, seller: req.user.userId });
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
