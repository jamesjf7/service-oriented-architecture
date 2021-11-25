
const express = require('express')
const axios = require('axios')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// 3rd party services
const key = '5d2cc545ffcd47aaaf9131605212511'; // register to http://api.weatherapi.com/ to get api key
const url = 'http://api.weatherapi.com';



app.get('/weather', async (req, res) => {
    const { city } = req.query
    
    // cara conventional
    // var config = {
    //     method: 'get',
    //     url: 'localhost:3000/weather?city=surabaya',
    //     headers: { }
    //   };
      
    // axios(config).then((response) => {
    //     console.log(response.data);
    // })
    // .catch((error) => {
    //     console.log(error);
    // });


    // cara singkat
    try {
        const result = await axios.get(`${url}/v1/current.json?key=${key}&q=${city}`);
        // hasil dari axios berupa response object 
        let data = result.data; // data dari response object
        return res.status(200).send(data); // kirim data ke client
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error");
    }

});



app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})