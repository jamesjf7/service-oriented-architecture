const express = require("express");
const books = require("./routes/books");

const app = express();

app.set("port", 3000);

/** middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** routes */
app.use("/books", books);

/** set port, listen for requests */
app.listen(app.get("port"), () => {
    console.log(`Alive at http://localhost:${app.get("port")}`);
});

module.exports = app;
