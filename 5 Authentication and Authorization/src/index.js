const express = require("express");
const jwt = require("jsonwebtoken"); // Import Json Web Token

// dotenv is a module that loads environment variables from a .env file into process.env
require("dotenv").config({ path: "src/.env" }); 

const app = express();


app.use(express.urlencoded({ extended: true }));

// secret key
const secret = process.env.SECRET || '@rahasia';
console.log('key:', secret);
// data user anggap aja dari database
let users = [
    {
        id: 1,
        name: 'admin',
        username: "admin",
        password: "admin",
        role: "admin",
    },
    {
        id: 2,
        name: 'admin',
        username: "user",
        password: "user",
        role: "user",
    },
];


app.post('/login', (req, res) => {
    // get data from request's body
    let { username, password } = req.body;

    // find user by username and password
    let user = users.find((user) => user.username === username && user.password === password);
    if (!user) {
        // if user not found
        return res.status(401).send({
            message: "Wrong username or password!",
        });
    }

    // generate token dengan user data dan secret key
    let token = jwt.sign({ username: user.username, role: user.role }, secret);
    // let token = jwt.sign(user, process.env.secret, { expiresIn: "10m" }); // expires in 10 minutes
    res.status(200).json({
        login_time: `${new Date()}`,
        token: token,
    });
});

app.get("/profile", checkToken, function (req, res) {
    let user = req.user; // get user data from request
    
    // find user by username
    user = users.find((user) => user.username === user.username);
    
    // send user data
    return res.status(200).json({
        message: "Success",
        user: user,
    });
});

// Middleware Checking if a JWT exists in the header
function checkToken(req, res, next) {
    if (!req.headers["x-auth-token"]) {
        return res.sendStatus(401)
    } else {
        // get token from header 
        let token = req.headers["x-auth-token"];

        // verify token
        jwt.verify(token, secret, function (err, decoded) {
            if (err) return res.sendStatus(403);
            req.user = decoded; // simpan data user ke request.user supaya bisa digunakan di route nantinya
        });
    }
    next();
}


app.listen(process.env.PORT, () => { console.log("Listening to port http://localhost:3000"); });
