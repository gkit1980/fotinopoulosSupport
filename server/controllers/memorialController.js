const express = require('express');
const memorialDAO = require('../daos/memorialDAO.js');

const router = express.Router();

// GET all memorials
router.get('/',async (req, res) => {
    try {
        const memorials = await memorialDAO.getAllMemorials();
        res.json(memorials);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});

// GET a specific memorial by ID
router.get('/:id', (req, res) => {
    const memorialId = req.params.id;
    const memorial = memorialDAO.getMemorialById(memorialId);
    if (memorial) {
        res.json(memorial);
    } else {
        res.status(404).json({ error: 'Memorial not found' });
    }
});

// POST a new memorial
router.post('/', (req, res) => {
    const newMemorial = req.body;
    const createdMemorial = memorialDAO.createMemorial(newMemorial);
    res.status(201).json(createdMemorial);
});

// PUT (update) an existing memorial
router.put('/:id', (req, res) => {
    const memorialId = req.params.id;
    const updatedMemorial = req.body;
    const result = memorialDAO.updateMemorial(memorialId, updatedMemorial);
    if (result) {
        res.json(updatedMemorial);
    } else {
        res.status(404).json({ error: 'Memorial not found' });
    }
});

// DELETE a memorial
router.delete('/:id', (req, res) => {
    const memorialId = req.params.id;
    const result = memorialDAO.deleteMemorial(memorialId);
    if (result) {
        res.json({ message: 'Memorial deleted' });
    } else {
        res.status(404).json({ error: 'Memorial not found' });
    }
});

module.exports = router;