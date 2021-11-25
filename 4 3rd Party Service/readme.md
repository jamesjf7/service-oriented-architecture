# 3rd Party Services

## Apa Itu Axios?
Klien HTTP berbasis *Promises* untuk browser, node.js dan JS, dengan menggunakan Axios kode lebih mudah di baca dan handling error lebih mudah.

## Install Axios
Buka terminal dan arahkan ke direktori project kemudian ketikan perintah di bawah ini
```bash
npm i axios
```

## Methods create requests menggunakan axios
These are method aliases, created for convenience.
```
axios(config) 
axios(url[, config])
```
These are method aliases, created for convenience.
```
axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.options(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])
```

## Axios Response object
Saat mengirimkan request ke server, axios akan mengembalikan response dalam bentuk object javascript yang terdiri dari:
- data - the payload returned from the server
- status - the HTTP code returned from the server
- statusText - the HTTP status message returned by the server
- headers - headers sent by server
- config - the original request configuration
- request - the request object

### Axios GET request with callbacks
In the first example, we create a simple GET request. We use callbacks.
```node
const axios = require('axios');
...
app.get('/', (req, res) => {
    axios.get(url).then(response => {
        console.log(response.data);
    });
});
```

### Axios GET request with async/await
The following example creates the same request. This time we use async/await syntax.
```node
const axios = require('axios');
...
app.get('/', async (req, res) => {
    let response = await axios.get(url);
    let data = response.data;
    console.log(data);
})
```

### Axios basic API
The get, post, or delete methods are convenience methods for the basic axios API: axios(config) and axios(url, config).
```node
const axios = require('axios');
...
app.get('/', async (req, res) => {
    const config = {
        method: 'get',
        url: url,
        headers: { ... } // kalau perlu header
    }
    let res = await axios(config)
    console.log(res.status);
});
```