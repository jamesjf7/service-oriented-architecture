/** library */
const express = require('express');

/** routes */
const users = require('./routes/users')

const app = express();

/** middleware */
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', users)

app.listen(3000, () => { console.log("Alive at http://localhost:3000"); });