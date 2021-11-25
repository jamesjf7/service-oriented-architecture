/** Library */ 
const express = require("express"); 
const fs = require("fs");
const morgan = require('morgan'); // npm i morgan --save

const app = express();

/** 
 * ini buat ngebuat stream dalam bentuk log sehingga waktu log tidak lewat console lagi tetapi langsung ke file 
 * flag a menandakan bahwa data akan di append terus 
 * */
const accessLogStream = fs.createWriteStream('./access.log', {flags:'a'},);

let msg = ''; // msg di sini untuk bantuan saja saat melakukan logging

/** 
 * ada 2 cara pendeklarasian format untuk log 
 * cara pertama menggunakan function seperti yang di dokumentasi morgan
 * join disini digunakan untuk menggabungkan string yang ada dalam array
 * cara ini ribet kelihatan nya tetapi ini bisa di custom juga 
 * */


// app.use(morgan((tokens,req,res)=>{
//     return [
//         tokens.method(req,res),
//         tokens.url(req,res),
//         tokens.status(req,res),
//         tokens['response-time'](req,res),'ms',
//         `Message: ${msg}`
//     ].join(' ')
// },{stream:accessLogStream}));

/** 
 * cara ke2 adalah dengan melakukan string formatting dengan binding
 * terlihat lebih simple tetapi kurang bisa dicustom karena ikut binding token dari morgan
 * Q: Gimana kalo mau nambahin token yang custom?
 * A: yaudah tambahin aja 
 * contohnya seperti ini 
 * */
morgan.token('msg',(req, res) => { return msg });
let format = morgan(`:method :url :status :res[content-length] - :response-time ms :msg`, { stream: accessLogStream, skip: (req, res) => { return res.statusCode < 400 } }); // yang pasti kalau declare token dengan nama yang sudah ada di morgan maka token tersebut akan di override
app.use(format);

/** 
 * Q: Terus bedanya sama yang atas apa?
 * A: Tidak ada cuma beda cara penulisan, lebih enak pakai yang morgan.token karena jelas saja 
 * Q: Jadi yang dipakai yang mana?
 * A: Terserah senyaman nya saja sama-sama berfungsi kok, sesuai style saja
 */

/**
 * property di morgan banyak Contohnya:
 * 1. Immediate: kalau dikasih true log nya waktu request bukan waktu kirim response 
 * artinya kalau data yang adanya cuma ada di response seperti status code gak bakal bisa dapet
 * 2. Skip: Log nya bisa cuma untuk ngecek error saja jadi diberi if seperti diatas
 * artinya kalau ada request yang status code nya <400 maka dia tidak akan di log
 */

app.get('/call', (req, res) => {
    msg = 'Call ...';
    return res.send('call').status(200);
})

app.get('/error', (req, res) => {
    msg = 'Error ...';
    return res.send('error').status(401);
})

app.listen(3000, () => { console.log('Listening to port http://localhost:3000'); });