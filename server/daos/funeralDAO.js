const Funeral = require('../models/funeral');
const moment = require('moment');

// Import the necessary modules and dependencies

class FuneralDAO {
    // Create a new funeral
    static async createFuneral(data) {
        try {
          
            const funeral = new Funeral(data);
            const savedFuneral = await funeral.save();
            return savedFuneral;
        } catch (error) {
            throw new Error(`Failed to create funeral: ${error.message}`);
        }
    }

    // Get all funerals
    static async getAllFunerals() {
        try {
            const funerals = await Funeral.find();
            return funerals;
        } catch (error) {
            throw new Error(`Failed to get funerals: ${error.message}`);
        }
    }

    // Get a specific funeral by ID
    static async getFuneralById(id) {
        try {
            const funeral = await Funeral.findById(id);
            return funeral;
        } catch (error) {
            throw new Error(`Failed to get funeral: ${error.message}`);
        }
    }

        // Method to get an funeral by full name
        static async getFuneralByFullName(funeralDeadFullName) {
            try {
                const funeral = await Funeral.findOne({ fullname: funeralDeadFullName });
                return funeral;
            } catch (error) {
                throw error;
            }
        }

    // Update a funeral by ID
    static async updateFuneralById(id, data) {
        try {
            //  console.log("Before:"+data.burialDate);
            // const dateObject = moment(data.burialDate, "DD/MM/YYYY HH:mm").toDate();
        
            // data.burialDate = dateObject;
            // console.log("After:"+data.burialDate);

            const updatedFuneral = await Funeral.findByIdAndUpdate(id, data, { new: true });
            return updatedFuneral;
        } catch (error) {
            throw new Error(`Failed to update funeral: ${error.message}`);
        }
    }

    // Delete a funeral by ID
    static async deleteFuneralById(id) {
        try {
            const deletedFuneral = await Funeral.findByIdAndDelete(id);
            return deletedFuneral;
        } catch (error) {
            throw new Error(`Failed to delete funeral: ${error.message}`);
        }
    }
}

module.exports = FuneralDAO;