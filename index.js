const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config({
    path: "./.env"
});

const connection = require("./src/database");

async function connect() {
    await connection.connect().catch(e => {
        new Error(e)
    });
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(helmet());
app.use(cors());

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json({
    extended: true
}));

// Routes and controllers initialization
app.get("/", (req, res) => {
    return res.json({
        message: "API's working well!"
    });
});

app.use("/v1/category", require("./src/routes/category.js"));

app.use((_, __, next) => {
    return next({
        error: "Route not found.",
        code: "route-not-found",
        status: 404,
    }); // Not found error
});

app.use((error, _, res, __) => {
    const body = {
        status: error.status || 500, // Error status
        error: error.error, // Descriptive string of the error
        code: error.code, // String to easly find out
    };
    return res.status(body.status).json(body); // Send Error and Status
});

app.listen(PORT, () =>
    console.log(`Server is running on: http://localhost:${PORT}/`)
);