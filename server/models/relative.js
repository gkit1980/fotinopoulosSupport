const mongoose = require('mongoose');

const RelativeSchema = new mongoose.Schema({
    relationdegree: {
        type: String,
        // enum: ['spouse', 'child', 'grandchild', 'brother', 'niece', 'other']
    },
    fullname: {
        type: String
    },
    fatherfullname: {
        type: String
    },
    motherfullname: {
        type: String
    },
    birthDate: {
        type: Date
    },
    birthlocation: {
        type: String
    },
    residence: {
        type: String
    },
    idNumber: {
        type: String
    },
    idPublicationDate: {
        type: Date
    },
    idAuthority: {
        type: String
    },
    afm: {
        type: String
    },
    doy: {
        type: String
    },
    amka: {
        type: String
    },
    phone: {
        type: String
    },
    phone2: {
        type: String
    },
    email: {
        type: String
    },
    iban: {
        type: String
    },
    taxisCodeUser: {
        type: String
    },
    taxisCodePassword: {
        type: String
    },
    funeral: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Funeral'
    },
    comments: {
        type: String
    }
});

const Relative = mongoose.model('Relative', RelativeSchema);

module.exports = Relative;