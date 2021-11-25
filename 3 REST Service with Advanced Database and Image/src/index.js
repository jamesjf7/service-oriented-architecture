/** library */
const express = require("express");

/** routes */
const upload = require("./routes/uploads");

const app = express();
//app.use(express.urlencoded({ extended: true }));


app.use("/api/uploads",upload);

app.listen(3000, () => { console.log(`Listening to http://localhost:3000`); });