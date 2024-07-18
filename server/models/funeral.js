const mongoose = require('mongoose');
const uri = 'mongodb+srv://gkit:Stud1980!@fotinopoulos.mongocluster.cosmos.azure.com/funeralDB?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000';


const funeralSchema = new mongoose.Schema({
  burialDate: Date,
  church: String,
  burialLocation: String,
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
  otherInfo: String,
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

// async function addFieldToExistingDocuments() {
//   try {
//     // Connect to the MongoDB database
//     await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//     console.log('Connected to MongoDB');

//     // Update all existing documents to add the new field with a default value
//     const result = await Funeral.updateMany(
//       {},
//       { $set: { otherInfo: '' } }
//     );

//     console.log(`${result.modifiedCount} documents were updated`);
//   } catch (error) {
//     console.error('Error updating documents:', error);
//   } finally {
//     // Close the connection to the database
//     await mongoose.connection.close();
//   }
// }
// addFieldToExistingDocuments();

module.exports = Funeral;