const mongoose = require('mongoose');
const uri = 'mongodb+srv://gkit:Stud1980!@fotinopoulos.mongocluster.cosmos.azure.com/funeralDB?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000';

const memorialSchema = new mongoose.Schema({
  date: Date,
  birthDate: Date,
  fortydOrYear: String,
  church: String,
  address: String,
  phones: String, // Assuming multiple phone numbers can be stored
  disc: String,
  cake: String,
  sakTsantKout: String,
  stolismos: String,
  fullname: String,
  schedules: String,
  price: String,
  comment: String,
  anouncement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Anouncement'
  },
  // Add more fields as necessary
});

const Memorial = mongoose.model('Memorial', memorialSchema);

// async function addFieldToExistingDocuments() {
//   try {
//     // Connect to the MongoDB database
//     await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//     console.log('Connected to MongoDB');

//     // Update all existing documents to add the new field with a default value
//     const result1 = await Memorial.updateMany(
//       {},
//       { $set: { birthDate: new Date() } }
//     );
//       console.log(`${result1.modifiedCount} documents were updated`);

//     // // Update all existing documents to add the new field with a default value
//     //     const result2 = await Funeral.updateMany(
//     //       {},
//     //       { $set: { hasRequest: false } }
//     //     );
//     //      console.log(`${result2.modifiedCount} documents were updated`);

//     //  // Update all existing documents to add the new field with a default value
//     // const result3 = await Funeral.updateMany(
//     //   {},
//     //   { $set: { receiptNumber: '' } }
//     // );
//     //    console.log(`${result3.modifiedCount} documents were updated`);

    


//   } catch (error) {
//     console.error('Error updating documents:', error);
//   } finally {
//     // Close the connection to the database
//     await mongoose.connection.close();
//   }
// }
// addFieldToExistingDocuments();

module.exports = Memorial;