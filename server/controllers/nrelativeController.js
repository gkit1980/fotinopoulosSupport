const express = require('express');
const RelativeDAO = require('../daos/relativeDAO');

const router = express.Router();

// Get all nrelatives
router.get('/', async (req, res) => {
    try {
        const nrelatives = await RelativeDAO.getAllRelatives();
        res.json(nrelatives);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a specific Relative by ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const Relative = await RelativeDAO.getRelativeById(id);
        if (Relative) {
            res.json(Relative);
        } else {
            res.status(404).json({ error: 'Relative not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create a new Relative
router.post('/', async (req, res) => {
    const relativeData = req.body;
    try {
        const newRelative = await RelativeDAO.createRelative(relativeData);
        res.status(201).json(newRelative);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update an existing Relative
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const relativeData = req.body;
    try {
        const updatedRelative = await RelativeDAO.updateRelativeById(id, relativeData);
        console.log("Updated Relative:"+updatedRelative);
        if (updatedRelative) {
            res.json(updatedRelative);
        } else {
            res.status(404).json({ error: 'Relative not found' });
        }
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});

// Delete a Relative
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedNrelative = await RelativeDAO.deleteRelativeById(id);
        if (deletedNrelative) {
            res.json(deletedNrelative);
        } else {
            res.status(404).json({ error: 'Relative not found' });
        }
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});

module.exports = router;