const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
  name: String,
  currency: String,
  capital: String,
  languages: [String],
  flag: String,
});

module.exports = mongoose.model("Country", CountrySchema);
