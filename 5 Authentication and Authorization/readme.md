### Autentication & Authorization 

```mpde
const jwt = require('jsonwebtoken');
jwt.sign(payload, secretOrPrivateKey, [options, callback])
```

```node
const jwt = require('jsonwebtoken');
jwt.verify(token, secretOrPublicKey, [options, callback])
```

## Implementation
utilize the middleware functionality in Express.js.
The middleware is a function that takes parameters of (req, res, next).
- The req is the sent request (GET, POST, DELETE, PUT, etc.).
- The res is the response that can be sent back to the user in a multitude of ways (res.sendStatus(200), res.json(), etc.).
- The next is a function that can be called to move the execution past the piece of middleware and into the actual app.get server response.

```node
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
        console.log(err)

        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

```

```node
app.get('/api/userOrders', authenticateToken, (req, res) => {
  // executes after authenticateToken
  // ...
})
```

## Errors & Codes
Possible thrown errors during verification. Error is the first argument of the verification callback.

TokenExpiredError
Thrown error if the token is expired.

Error object:

name: 'TokenExpiredError'
message: 'jwt expired'
expiredAt: [ExpDate]