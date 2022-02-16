require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const constants = require("./utility/constant");
const swaggerUi = require("swagger-ui-express");
const router = require("./routes");
const swaggerFile = require("../public/api-docs/swagger-output.json");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 4000;
const db = mongoose.connection;

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerFile, constants.SWAGER_OPTIONS)
);
app.use(cors(constants.CORS_OPTIONS));
app.use(router);
app.use(
    "/",
    swaggerUi.serve,
    swaggerUi.setup(swaggerFile, constants.SWAGER_OPTIONS)
);

app.listen(PORT, () => {
    try {
        mongoose.connect("mongodb://localhost:27017/onboard-aggregator");
        db.on("error", () => console.log(`Database connection error`));
        db.once("open", function() {
            console.log("onboard-aggregator Database connected!!");
        });
    } catch (error) {
        console.log(`Something went wrong! ${error}`);
    }
    console.log(`Server running on the ${PORT} port!`);
});

module.exports = app;