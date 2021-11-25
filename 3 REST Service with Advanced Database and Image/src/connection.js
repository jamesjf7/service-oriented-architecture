/**
 * file ini akan berisi konfigurasi database beserta query yang akan digunakan
 * di sini akan dijelaskan menggunakan pool
 * kenapa pake pool? ya yang buat tutor kebiasaan pake pool :D
 * lebih paham pake connection? waktu materi pake pool atau connection biasa?
 * sembarang, tergantung selera dan kebiasaan masing-masing
 * */

const mysql = require("mysql"); 
var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "tutor_soa_m3"
});

const executeQuery = async (query) => {
    return new Promise((resolve, reject) => {
        /** 
         * NOTE:
         * pool.query akan otomatis melakukan request koneksi dari mysql Pool nya,
         * melakukan query dan akan melepaskan koneksinya kembali
         * sehingga pada pool tidak perlu digunakan conn.getConnection untuk mendapatkan connection
         * dan conn.release untuk melepaskan koneksi.
         * Pool akan melakukan getConnection dan release connection secara otomatis (peka deh, mempermudah programmer nya.. semoga yang baca dapet pasangan yang peka juga :D #opose)
         * */
        pool.query(query, (err, rows, fields) => {
            if (err) reject(err);
            else resolve(rows);
        })
    })
}

/** funsgi dibawah ini untuk melakukan query pake parameter */
const executeQueryWithParam = async (query, param) => {
    return new Promise((resolve, reject) => {
        pool.query(query, param, (err, rows, fields) => {
            if (err) reject(err);
            else resolve(rows);
        })
    })
}

module.exports= {
    'executeQuery' : executeQuery,
    'executeQueryWithParam' : executeQueryWithParam,
}