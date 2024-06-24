const express = require('express');
const userDao = require('../daos/userDAO');

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await userDao.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
});

// Get a user by ID
router.get('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await userDao.getUserById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve user' });
    }
});


// Get a user by email, password
router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await userDao.getUserByEmailAndPassword(email, password);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});


// Create a new user
router.post('/', async (req, res) => {
    const newUser = req.body;
    try {
        const createdUser = await userDao.createUser(newUser);
        res.status(201).json(createdUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// Update a user
router.put('/:id', async (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    try {
        const user = await userDao.updateUser(userId, updatedUser);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const deletedUser = await userDao.deleteUser(userId);
        if (deletedUser) {
            res.json(deletedUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

module.exports = router;