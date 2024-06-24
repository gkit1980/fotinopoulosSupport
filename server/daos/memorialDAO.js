const Memorial = require('../models/memorial');
const moment = require('moment');

class MemorialDAO {
  static  async createMemorial(memorialData) {
        try {
            const memorial = new Memorial(memorialData);
            const createdMemorial = await memorial.save();
            return createdMemorial;
        } catch (error) {
            throw new Error(`Failed to create memorial: ${error.message}`);
        }
    }

    static  async getMemorialById(memorialId) {
        try {
            const memorial = await Memorial.findById(memorialId);
            return memorial;
        } catch (error) {
            throw new Error(`Failed to get memorial by ID: ${error.message}`);
        }
    }

    static  async getAllMemorials() {
        try {
            console.log('memorials');
            const memorials = await Memorial.find();
            console.log('memorials', memorials);
            return memorials;
        } catch (error) {
            throw new Error(`Failed to get all memorials: ${error.message}`);
        }
    }

    static async updateMemorial(memorialId, memorialData) {
        try {

            const [day, month, year] = memorialData.date.split('/');
            console.log('day', day);
            console.log('month', month);
            console.log('year', year);
            // memorialData.date = new Date(year, month, day);
            // console.log('memorialData', memorialData);

            const dateString =  year + "-" + month + "-" + day;
            // return dd + "/" + mm + "/" + yyyy;
           // const dateObject = parse(dateString, "dd/MMM/yyyy", new Date());
           var dateObject = new Date(moment(dateString).format("YYYY-MM-DD"))
        //    const dateObject = moment(memorialData.date, 'DD/MM/YYYY').toDate();
        
            memorialData.date = dateObject;


            const updatedMemorial = await Memorial.findByIdAndUpdate(
                memorialId,
                memorialData,
                { new: true }
            );
            return updatedMemorial;
        } catch (error) {
            throw new Error(`Failed to update memorial: ${error.message}`);
        }
    }

    static async deleteMemorial(memorialId) {
        try {
            await Memorial.findByIdAndDelete(memorialId);
        } catch (error) {
            throw new Error(`Failed to delete memorial: ${error.message}`);
        }
    }
}

module.exports = MemorialDAO;