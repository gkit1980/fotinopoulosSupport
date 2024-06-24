const Anouncement = require('../models/anouncement');

// Import the necessary modules and dependencies

// Define the AnouncementDAO class
class AnouncementDAO {
    // Method to create a new anouncement
    async createAnouncement(anouncementData) {
        try {
            console.log(anouncementData);
            const newAnouncement = new Anouncement(anouncementData);
            const savedAnouncement = await newAnouncement.save();
            return savedAnouncement;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // Method to get all anouncements
    async getAllAnouncements() {
        try {
            const allAnouncements = await Anouncement.find();
            return allAnouncements;
        } catch (error) {
            throw error;
        }
    }


    // Method to get a specific anouncement b ID
    async getAnouncementById(anouncementId) {
        try {
            const anouncement = await Anouncement.findById(anouncementId);
            return anouncement;
        } catch (error) {
            throw error;
        }
    }

    // Method to update an existing anouncement
    async updateAnouncement(anouncementId, updatedData) {
        try {
            const updatedAnouncement = await Anouncement.findByIdAndUpdate(
                anouncementId,
                updatedData,
                { new: true }
            );
            return updatedAnouncement;
        } catch (error) {
            throw error;
        }
    }

    // Method to delete an existing anouncement
    async deleteAnouncement(anouncementId) {
        try {
            const deletedAnouncement = await Anouncement.findByIdAndDelete(anouncementId);
            return deletedAnouncement;
        } catch (error) {
            throw error;
        }
    }
}

// Export an instance of the AnouncementDAO class
module.exports = new AnouncementDAO();