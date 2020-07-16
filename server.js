const express = require("express");
const connectDB = require("./config/db");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const upload = require("express-fileupload");
// const cors = require('cors')
const PORT = process.env.PORT || 5000;
// const cors_authentication = require('./middleware/cors')

//Connect Database
connectDB();

//Using Static
app.use(express.static(path.join(__dirname, "public"))); //to access the files in public folder

// app.use(cors_authentication.cors_authentication); // it enables all cors requests
//File Upload Middleware
app.use(upload());

//Init Middleware
app.use(express.urlencoded({ limit: "10mb", extended: false }));
app.use(express.json({ limit: "10mb", extended: true }));

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Define Routes
app.use("/users", require("./routes/home/users"));
app.use("/newsletter", require("./routes/home/newsletter"));
app.use("/tour", require("./routes/home/tour"));
app.use("/custom_tour", require("./routes/home/custom_tour"));
app.use("/admin/users", require("./routes/admin/users"));
app.use("/admin/newsletter", require("./routes/admin/newsletter"));
app.use("/admin/tour", require("./routes/admin/tour"));
app.use("/admin/custom_tour", require("./routes/admin/custom_tour"));

app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
