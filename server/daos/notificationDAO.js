const Notification = require('../models/notification');

// Import the necessary modules and dependencies

// Define the AnouncementDAO class
class NotificationDAO {
    // Method to create a new anouncement
    async createNotification(notificationData) {
        try {
            console.log(notificationData);
            const newAnouncement = new Notification(notificationData);
            const savedNotification = await newAnouncement.save();
            return savedNotification;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // Method to get all anouncements
    async getAllNotifications() {
        try {
            const allNotifications = await Notification.find();
            return allNotifications;
        } catch (error) {
            throw error;
        }
    }

    // Method to get a specific anouncement by ID
    async getNotificationById(notificationId) {
        try {
            const notification = await Notification.findById(notificationId);
            return notification;
        } catch (error) {
            throw error;
        }
    }

  
}

// Export an instance of the AnouncementDAO class
module.exports = new NotificationDAO();