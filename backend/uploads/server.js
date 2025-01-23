const express = require("express");
const bodyParser = require("body-parser");
const resumeRouter = require("./routes/resumeRouter"); // Existing router
// const aiRouter = require("./routes/aiRouter"); // New AI route
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/resume", resumeRouter);
// app.use("/api/ai", aiRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
