const mongoose = require('mongoose');
const funeralSchema = new mongoose.Schema({
  fullname: String,
  age: Number,
  fatherMotherName: String,
  afm: String,
  amka: String,
  idNumber: String,
  idPublicationDate: Date,
  idAuthority: String,
  foreas: String,
  spouseName: String,
  profession: String,
  residence: String,
  placeOfDeath: String,
  // Add more fields as necessary
  anouncement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Anouncement'
  },
  relative: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Relative'
  }
});

// Create a model using the schema

const Funeral = mongoose.model('Funeral', funeralSchema);

module.exports = Funeral;