const mongoose = require('mongoose');

const memorialSchema = new mongoose.Schema({
  date: Date,
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
  price: Number,
  comment: String
  // Add more fields as necessary
});

const Memorial = mongoose.model('Memorial', memorialSchema);

module.exports = Memorial;