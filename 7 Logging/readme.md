# Logging
## Installation
This is a Node.js module available through the npm registry. Installation is done using the npm install command:
```bash
$ npm install morgan
```

## Token
- :date[format]
The current date and time in UTC. The available formats are (If no format is given, then the default is web):
    - clf for the common log format ("10/Oct/2000:13:55:36 +0000")
    - iso for the common ISO 8601 date time format (2000-10-10T13:55:36.000Z)
    - web for the common RFC 1123 date time format (Tue, 10 Oct 2000 13:55:36 GMT)


- :http-version
The HTTP version of the request.

- :method
The HTTP method of the request.

- :referrer
The Referrer header of the request. This will use the standard mis-spelled Referer header if exists, otherwise Referrer.

- :remote-addr
The remote address of the request. This will use req.ip, otherwise the standard req.connection.remoteAddress value (socket address).

- :remote-user
The user authenticated as part of Basic auth for the request.

- :req[header]
The given header of the request. If the header is not present, the value will be displayed as "-" in the log.

- :res[header]
The given header of the response. If the header is not present, the value will be displayed as "-" in the log.

- :response-time[digits]
The time between the request coming into morgan and when the response headers are written, in milliseconds. The digits argument is a number that specifies the number of digits to include on the number, defaulting to 3, which provides microsecond precision.

- :status
The status code of the response. If the request/response cycle completes before a response was sent to the client (for example, the TCP socket closed prematurely by a client aborting the request), then the status will be empty (displayed as "-" in the log).

- :total-time[digits]
The time between the request coming into morgan and when the response has finished being written out to the connection, in milliseconds. The digits argument is a number that specifies the number of digits to include on the number, defaulting to 3, which provides microsecond precision.

- :url
The URL of the request. This will use req.originalUrl if exists, otherwise req.url.

- :user-agent
The contents of the User-Agent header of the request.

## Examples
### express/connect
Sample app that will log all request in the Apache combined format to STDOUT
```node
const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('combined'))

app.get('/', function (req, res) {
  res.send('hello, world!')
})
vanilla http server
Sample app that will log all request in the Apache combined format to STDOUT

var finalhandler = require('finalhandler')
var http = require('http')
var morgan = require('morgan')

// create "middleware"
var logger = morgan('combined')

http.createServer(function (req, res) {
  var done = finalhandler(req, res)
  logger(req, res, function (err) {
    if (err) return done(err)

    // respond to request
    res.setHeader('content-type', 'text/plain')
    res.end('hello, world!')
  })
})
```

### write logs to a file
Sample app that will log all requests in the Apache combined format to the file access.log.
```node
const express = require('express')
const fs = require('fs')
const morgan = require('morgan')
const path = require('path')

var app = express()

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

app.get('/', function (req, res) {
  res.send('hello, world!')
})
```

### log file rotation
Sample app that will log all requests in the Apache combined format to one log file per day in the log/ directory using the rotating-file-stream module.
```node
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const rfs = require('rotating-file-stream') // version 2.x

var app = express()

// create a rotating write stream
var accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

app.get('/', function (req, res) {
  res.send('hello, world!')
})
```