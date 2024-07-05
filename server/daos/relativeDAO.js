const Relative = require('../models/relative');
const moment = require('moment');

// Import the necessary modules and dependencies

class RelativeDAO {
    // Method to create a new Relative
    async createRelative(data) {
        try {
            console.log("Relative Data:"+data);
            const newRelative = new Relative(data);
            const savedNRelative = await newRelative.save();
            return savedNRelative;
        } catch (error) {
            throw error;
        }
    }

    // Method to get all nrelatives
    async getAllRelatives() {
        try {
            const nrelatives = await Relative.find();
            return nrelatives;
        } catch (error) {
            throw error;
        }
    }

    // Method to get a specific Relative by ID
    async getRelativeById(id) {
        try {

            const relative = await Relative.findById(id);
            return relative;
        } catch (error) {
            throw error;
        }
    }

    // Method to update a specific Relative by ID
    async updateRelativeById(id, data) {
        try {
         
            // Convert the birthDate string to a Date object
            console.log("Before Relative Birthdate:"+data.birthDate);
            if(data.birthDate=="")
                 data.birthDate=null


            // Convert the idPublicationDate string to a Date object
            console.log("Before Relative idPublicationDate:"+data.idPublicationDate);
            if(data.idPublicationDate=="")
                data.idPublicationDate=null
            
            const updatedNRelative = await Relative.findByIdAndUpdate(id, data, { new: true });
            return updatedNRelative;
        } catch (error) {
            console.log("Error:"+error);
            throw error;
        }
    }

    // Method to delete a specific Relative by ID
    async deleteRelativeById(id) {
        try {
            const deletedNRelative = await Relative.findByIdAndDelete(id);
            return deletedNRelative;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new RelativeDAO();