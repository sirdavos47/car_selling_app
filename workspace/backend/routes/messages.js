const express = require('express');
const Message = require('../models/Message');
const auth = require('../utils/authMiddleware');

const router = express.Router();

// Get messages for a car
router.get('/:carId', auth, async (req, res) => {
  const messages = await Message.find({ car: req.params.carId })
    .populate('sender', 'name email')
    .populate('receiver', 'name email')
    .sort({ createdAt: 1 });
  res.json(messages);
});

// Send message
router.post('/:carId', auth, async (req, res) => {
  const { content, receiver } = req.body;
  const message = new Message({
    car: req.params.carId,
    sender: req.user.userId,
    receiver,
    content
  });
  await message.save();
  res.status(201).json(message);
});

module.exports = router;
