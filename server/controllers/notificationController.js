const express = require('express');
const NotificationDAO = require('../daos/notificationDAO');

const router = express.Router();


// GET all Notifications
router.get('/',async (req, res) => {
    try {
        const Notifications = await NotificationDAO.getAllNotifications();
        res.json(Notifications);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});

// GET a specific Notification by ID
router.get('/:id', (req, res) => {
    const NotificationId = req.params.id;
    const Notification = NotificationDAO.getNotificationById(NotificationId);
    if (Notification) {
        res.json(Notification);
    } else {
        res.status(404).json({ error: 'Notification not found' });
    }
});


//create a new notification
router.post('/', async (req, res) => {
    try {
        const notification = req.body;
        const createdNotification = await NotificationDAO.createNotification(notification);
        res.status(201).json(createdNotification);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create notification' });
    }
});

module.exports = router;

