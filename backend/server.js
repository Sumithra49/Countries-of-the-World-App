const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/countries", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/countries", require("./routes/countries"));
app.use("/favorites", require("./routes/favorites"));
app.use("/history", require("./routes/history"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
