const express = require("express");

const mongoose = require("mongoose");
const routes = require("./routes/api");
const app = express();
const PORT = process.env.PORT || 3001;

const config = require('./config/config.json');


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

//Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || `mongodb://${config.database.dbName}:${config.database.dbpass}@ds351987.mlab.com:51987/heroku_wm2lrfp9`, { useNewUrlParser: true });

// Start the API server
app.listen(PORT, function () {
    console.log(`API Server now listening on PORT ${PORT}!`)
});
