/**
 * name : index.js / app.js / main.js / server.js
 */

const express = require("express");
const books = require("./routes/books");

const app = express();

// router for math

app.set("port", 3000);

/**
 * express.json() => middleware untuk parsing data application/json
 * express.urlencoded(...) => middleware untuk parsing data application/x-www-form-urlencoded
 **/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

// simple route
app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
    /**
     * res.status(...) => status code
     * 2XX : success
     * 4XX : client error
     * 5XX : server error
     * res.send(...) => send response
     * res.json(...) => send json response
     */
});

// Structured route
app.use("/books", books);

app.listen(app.get("port"), () => {
    console.log(`Alive at http://localhost:${app.get("port")}`);
});

module.exports = app;
