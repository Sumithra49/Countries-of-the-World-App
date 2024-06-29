const express = require("express");
const axios = require("axios");
const Country = require("../models/Country");

const router = express.Router();

// Fetch country details by currency code
router.get("/:currencyCode", async (req, res) => {
  const { currencyCode } = req.params;
  try {
    const response = await axios.get(
      `https://restcountries.com/v2/currency/${currencyCode}`
    );
    const countries = response.data.map((country) => ({
      name: country.name,
      currency: country.currencies[0].code,
      capital: country.capital,
      languages: country.languages.map((lang) => lang.name),
      flag: country.flag,
    }));
    res.json(countries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
