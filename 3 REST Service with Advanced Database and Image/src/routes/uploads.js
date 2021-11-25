//==== library, model =======
const express = require("express");
const multer = require('multer');

const uploadModel = require('../models/uploads')
//====================

const router = express.Router();

/** 
 * storage ini akan mengkonfigurasikan penyimpanan dari file yang akan diupload, 
 * berupa destination path dan file name yang akan diupload.
 * */
const storage=multer.diskStorage({
    /**
     * destination ini merupakan konfigurasi dari tempat penyimpanan file yang akan diupload.
     * cara nulisnya seperti dibawah
     * jadi destination nya akan diisi sebuah function. parameternya ada 3
     * req → request yang diberikan (body value yang dikirimkan)
     * file → objek file yang diupload
     * callback → function yang akan dijalankan ketika tidak terjadi masalah apa2 pada konfigurasi. kembalian dari callback adalah null
     * diikuti dengan direktori dari penyimpanan. kenapa null? ya entah memang dibuat begitu. di dokumentasi juga tidak ada penjelasan
     * secara khusus kenapa null
     * */
    destination:function(req,file,callback){
        callback(null,'./public/uploads');
    },
    /**
     * filename ini merupakan konfigurasi dari nama dari file yang akan diupload.
     * cara nulisnya seperti dibawah
     * jadi filename nya akan diisi sebuah function. Sama seperti destination, parameternya ada 3
     * req → request yang diberikan (body value yang dikirimkan)
     * file → objek file yang diupload
     * callback → function yang akan dijalankan ketika tidak terjadi masalah apa2 pada konfigurasi. kembalian dari callback adalah null 
     * diikuti dengan nama dari file.
     * */
    filename:function(req,file,callback){
        /**
         * file.originalname ini asli dari file yang diupload
         * lalu untuk mendapatkan extension nya, dilakukan pengolahan seperti dibawah.
         * pada contoh ini misalnya nama dari file yang diupload akan didapatkan dari body. nah disini bisa dipakai req.body.<nama_key>.
         * */
        const extension = file.originalname.split('.')[file.originalname.split('.').length-1];
        const filename = req.body.file_name;
        callback(null,(filename+'.'+extension));
    }
});

/**
 * fucntion dibawah ini untuk memeriksa apakah file yang diunggah adalah bertipe gambar. parameternya ada 2, file dan callback
 * bawaannya sudah seperti itu, jadi tinggal pakai dan ikuti saja
 * */
function checkFileType(file,cb){
    // penulisan filetypes yang akan dicek seperti dibawah, diawali dan diakhiri dengan slash, lalu per tipe file dipisahkan dengan pipeline
    const filetypes= /jpeg|jpg|png|gif/;
    // extname ini nanti akan berisi boolean yang didapatkan dari hasil pengetesan filetypes.test
    // filetypes.test akan membandingkan ektensi file yang didapat dengan operasi string dibawah, degnan filetypes yang telah dideklarasikan diatas
    const extname=filetypes.test(file.originalname.split('.')[file.originalname.split('.').length-1]);
    // nah mimetype ini nanti akan dites kan juga apakah sudah sesuai dengan mimetype nya atau belum
    // contoh mimetype: image/gif image/png image/jpg
    const mimetype=filetypes.test(file.mimetype);
    // dicek apakah mimetype dan extension name nya sdh memenuhi syarat (sesuai dengan filetypes)
    if(mimetype && extname){
        /** 
         * nah yang diakses adalah callbacknya.
         * kalau sudah sesuai dan memenuhi syarat dari filetypes, callback nya diisi null dan true 
         * (kenapa null? tidak tahu :v bawaannya multer memang begitu tanpa penjelasan lebih lanjut seperti ditnggal pasangan tanpa alasan)
         * nah yang penting disini adalah "TRUE" nya. karena kalau di true, menandakan kalau file sudah lolos seleksi
         * */
        return cb(null,true);
    }else{
        /** 
         * nah kalau ga lolos seleksi gimana?
         * callbacknya diisi error.. nanti response nya sudah otomatis 500 internal server error
         * message nya bisa diganti-ganti, tergantung kalian ngisi pesan di callback nya seperti apa
         * */
        cb(error = 'Error : Image Only!');
    }
}

// nah core dari multer adalah segmen program dibawah ini
const upload=multer({
    // yang wajib dideklarasikan adalah STORAGE nya.
    storage:storage,
    /**
     * file filter ini cuma pemanis saja supaya ada pengecekan tipe file nya
     * jadi file filter hanya bersifat optional saja
     * cara pakai file filter ya seperti dibawah, ada 3 parameter dari fucntionnya, yang dilemparkan adalah file yang diupload dan callbacknya
     *  */
    fileFilter: function(req,file,cb){
        checkFileType(file,cb);
    }
});


/** 
 * waktu diakses ke router, jangan lupa kasih `upload.single("file_data")`. file data ini adalah nama key yang ada di body postman nya ya
 * supaya bisa upload file gimana? kalau biasanya kita pakai x-www-form-urlformencoded ato sejenisnya lah mbo nama e susah
 * sekarang kita pakai yang form-data, nanti type nya bisa diganti text dan file kalau dihover pada kolom KEY bagian kanan (buat key barunya dulu ya baru dihover, kalau ndak buat nanti ndak ketemu :D)
 * */  
router.post('/', upload.single("file_data"), async(req,res)=> {
    let file_name = req.body.file_name
    let nama_user = req.body.nama
    let directory = './public/uploads/'+req.file.filename
    try {
        /** 
         * ya ini menambahkan data nama user beserta direktori file ke dalam database
         * yang disimpan direktorinya saja, supaya gampang dan tidak memberat-beratkan database
         * */
        
        let result = await uploadModel.addNew(nama_user,directory)
        res.status(200).json({
            message: result,
            nama_user: nama_user,
            file_name: file_name,
            file_directory: directory
        })
    } catch (error) {
        console.log(error);
    }
})

/**  
 * NOTE
 * sifat dari multer adalah melakukan overwrite apabila terdapat file yang memiliki nama yang sama, sama ketika mantan kalian mereplace anda dengan pacar baru mereka
 * overwrite nya ndak ada konfirmasi, jadi hati-hati :D
 * 
 * oh sama ini, multer ini manja dan tidak mandiri
 * jadi pastikan direktori tempat file untuk diupload sudah ada ya
 * kalau contoh disini, harus buat folder public yang di dalamnya dibuat folder uploads lagi
 * */ 
module.exports = router;