const express = require('express');
const AnouncementDAO = require('../daos/anouncementDAO');

const router = express.Router();

// Create a new anouncement
router.post('/', async (req, res) => {
    try {
        const anouncement = req.body;
        const createdAnouncement = await AnouncementDAO.createAnouncement(anouncement);
        res.status(201).json(createdAnouncement);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create anouncement' });
    }
});

// Get all anouncements
router.get('/', async (req, res) => {
    try {
        const anouncements = await AnouncementDAO.getAllAnouncements();
        res.json(anouncements);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get anouncements' });
    }
});

// Get a specific anouncement by ID
router.get('/:id', async (req, res) => {
    try {
        const anouncementId = req.params.id;
        const anouncement = await AnouncementDAO.getAnouncementById(anouncementId);
        if (anouncement) {
            res.json(anouncement);
        } else {
            res.status(404).json({ error: 'Anouncement not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to get anouncement' });
    }
});


// Update an existing anouncement
router.put('/:id', async (req, res) => {
    try {
        const anouncementId = req.params.id;
        const updatedAnouncement = req.body;
        const result = await AnouncementDAO.updateAnouncement(anouncementId, updatedAnouncement);
        if (result) {
            res.json(updatedAnouncement);
        } else {
            res.status(404).json({ error: 'Anouncement not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update anouncement' });
    }
});

// Delete an anouncement
router.delete('/:id', async (req, res) => {
    try {
        const anouncementId = req.params.id;
        const result = await AnouncementDAO.deleteAnouncement(anouncementId);
        if (result) {
            res.json({ message: 'Anouncement deleted successfully' });
        } else {
            res.status(404).json({ error: 'Anouncement not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete anouncement' });
    }
});

module.exports = router;