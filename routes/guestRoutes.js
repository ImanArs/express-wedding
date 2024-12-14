const express = require('express');
const Guests = require('../models/guest');
const router = express.Router();

/**
 * @swagger
 * /api/guests:
 *   post:
 *     summary: Create a new guest
 *     tags: [Guests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               createdAt:
 *                 type: string
 *                 example: now
 *               name:
 *                 type: string
 *                 example: John Doe
 *               phone_number:
 *                 type: string
 *                 example: +1234567890
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *             required:
 *               - name
 *               - phone_number
 *     responses:
 *       201:
 *         description: Guest created successfully
 *       400:
 *         description: Invalid input data
 */
router.post('/api/guests', async (req, res) => {
  try {
    if (!req.body.name || !req.body.phone_number) {
      return res.status(400).json({ error: 'Name and phone_number are required.' });
    }
    const guest = new Guests(req.body);
    await guest.save();
    res.status(201).json(guest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


/**
 * @swagger
 * /api/guests:
 *   get:
 *     summary: Get all guests
 *     tags: [Guests]
 *     responses:
 *       200:
 *         description: List of all guests
 *       500:
 *         description: Server error
 */
router.get('/api/guests', async (req, res) => {
  try {
    const guests = await Guests.find();
    res.json(guests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/**
 * @swagger
 * /api/guests/{id}:
 *   put:
 *     summary: Update a guest by ID
 *     tags: [Guests]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the guest to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               email:
 *                 type: string
 *               confirmed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Updated guest object
 *       404:
 *         description: Guest not found
 *       400:
 *         description: Invalid data
 */
router.put('/api/guests/:id', async (req, res) => {
  try {
    const guest = await Guests.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!guest) {
      return res.status(404).json({ error: 'Guest not found' });
    }
    res.json(guest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


/**
 * @swagger
 * /api/guests/{id}:
 *   delete:
 *     summary: Delete a guest by ID
 *     tags: [Guests]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the guest to delete
 *     responses:
 *       200:
 *         description: Success message
 *       404:
 *         description: Guest not found
 *       500:
 *         description: Server error
 */
router.delete('/api/guests/:id', async (req, res) => {
  try {
    const guest = await Guests.findByIdAndDelete(req.params.id);
    if (!guest) {
      return res.status(404).json({ error: 'Guest not found' });
    }
    res.json({ message: 'Guest deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
