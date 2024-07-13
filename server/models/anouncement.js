const mongoose = require('mongoose');

const anouncementSchema = new mongoose.Schema({
    spouse: {
        type: String
    },
    childs: {
        type: String
    },
    grandchilds: {
        type: String
    },
    brothers:{
        type: String
    },
    nieces: {
        type: String
    },
    others: {
        type: String
    },
    address: {
        type: String
    },
    additionalinfo: {
        type: String
    },
    wreaths: {
        type: String
    },
    funeral: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Funeral'
    }
    
});

const Anouncement = mongoose.model('Anouncement', anouncementSchema);

module.exports = Anouncement; 