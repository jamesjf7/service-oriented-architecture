//Penjelasan Asynchronous

/*
    app.get('/', (req,res) => {
        res.send("Hello World !");
    });
*/

//Kode diatas sebenarnya asynchronous

/*
    Asynchronous berarti hal tersebut bekerja tersendiri dan selesai pada waktunya sendiri, mengabaikan alur kerja dari lainnya. 
    
    Alur kerja Synchronous :

    FUNGSI1 ======> FUNGSI2 ======> FUNGSI3 ======> FUNGSI4

    Alur kerja Asynchronous (Seandainya FUNGSI2 Asynchronous):

    FUNGSI1 ======> FUNGSI3 ======> FUNGSI4
                    FUNGSI2

   
    Asynchronous biasanya terjadi pada query database, dimana query database dalam kuantitas data yang besar dapat menyebabkan database untuk membutuhkan waktu untuk mencari dan mengambil data tersebut sebelum dikirimkan.
    Pembuatan fungsi Async :

    function Hallo(){
        //some async things here
    }
    
    akan dirubah menjadi :

    async function Hallo(){
        //some async things here
    }

    Asynchronous bisa dicontohkan seperti mengirimkan paket, paket tidak selalu terkirim dalam waktu yang paten (misalnya tepat 3 hari). Akan tetapi, paket akan sampai hingga pengirim sampai hingga lokasi, sehingga waktu hingga paket sampai menjadi tidak pasti. Dalam pemrograman, hal ini merupakan masalah karena pemrograman harus memiliki alur yang jelas.
    
    Untuk menanggulangi masalah diatas terdapat 3 cara untuk mengembalikan alur dari ASynchronous ke Synchronous :
    1. Callback Functions
    2. Await
    3. Promises 

    > Callback Functions :
    Callback Functions merupakan fungsi yang dipanggil kembali setelah sebuah fungsi dijalankan. 

    app.get('/', function(req,res){
        res.send("Hello World !");
    });

    Kode diatas merupakan cara untuk menggunakan callback functions.
    
    Callback functions selalu diletakkan dipaling belakang dari sebuah fungsi asynchronous.

    Berikut adalah contoh pembuatan fungsi callback :

    function example(message, callback){
        console.log(message);

        callback();
    }

    Dan dapat dipanggil dengan :

    example("HALLOOOO GAESSS DAVID DISINIII", function(){
        console.log("KEMBALI LAGI DENGAN REVIEW RTX 6080 SAYA YANG BARU");
    })

    > Await :
    Await adalah cara untuk memberitahu program untuk menunggu sebuah fungsi untuk selesai baru melanjutkan program.

    Await hanya berjalan dalam fungsi dengan tag Async!

    Berikut adalah contoh pengunaan await :

    let document;
    document = await Mongo.findOne({user: response.body.user});

    p.s : jangan tanya mongo itu apa, anggap saja itu fungsi asynchronous (Sebenarnya itu fungsi query database untuk database MongoDB)

    Dalam potongan program diatas, document akan berisi hasil query dari database. akan tetapi program tidak akan berjalan sebelum database berhasil mengembalikan hasil query.

    Jadi await bisa di contohkan seperti ini :

    https://knowyourmeme.com/memes/vault-boy-hold-up

    atau bisa dicontohkan seperti menghentikan kendaraan yang lewat agar pejalan kaki dapat menyebrangi jalan raya.

    > Promises :
    Promise adalah salah satu cara untuk menanggulangi asynchronous, terutama callback hell.

    Apa itu callback hell?
    Andaikan jika anda harus mengambil query dari 10 tabel yang berbeda, lalu mengproses data tersebut untuk mengeluarkan report yang jelas. Berarti anda harus menunggu 10 query anda untuk selesai baru membuat report kan ? Nah karena query nya asynchronous, berarti harus di tanggulangi. Jika di tanggulangi dengan callback maka akan berbentuk seperti berikut :

    query1(function(){
        query2(function(){
            query3(function(){
                query4(function(){
                    query5(function(){
                        query6(function(){
                            query7(function(){
                                query8(function(){
                                    query9(function(){
                                        query10(function(){
                                            Buat reportnya disini astaga panjang banget
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })

    Sudah kayak piramida ya ? Ya ini disebut dengan callback hell, dimana callback bertumpuk karena banyaknya fungsi asynchronous yang harus ditunggu. Oleh karena itu adanya yang disebut dengan Promise.

    Promise itu adalah sebuat object, yang "mungkin" mengembalikan data di kemudian hari. Kenapa mungkin ? Karena promise itu hanya janji. Janji bisa diingkari, seperti saya di php terus sama doi :(. Kalau doi aja bisa php in kamu apalagi kode yang baru kamu tulis.

    Promise dapat di contohkan sebagai berikut :

    Seandainya teman anda Jason janji untuk membelikan anda kue Black Forest besok, kemungkinannya ada 2. Jason besok beli kue atau Jason nge php in kamu (Jason tidak beli kue black forest). Jika Jason besoknya bawakan kamu kue Black Forest, berarti Promise / Janji jason sukses atau kata lain "resolved". Sementara jika Jason esok harinya tidak bawa kue Black Forest berarti Janji Jason gagal atau kata lainnya "rejected".

    Contoh diatas dapat di kodingkan sebagai berikut :

    let niatJasonBeliKue = false;

    const TanganKu = new Promise((resolve,reject) => {
        if (niatJasonBeliKue){
            const data = "Black Forest Cake";
            resolve(data);
        }
        else {
            const why = "Kamu siapa saya kok mau di beliin kue ?";
            reject(why);
        }
    });

    Dapat dilihat diatas bahwa promise akan memberikan data jika suatu kondisi tertentu telah di temui, jika tidak di temui kondisi tersebut, promise akan meng reject dengan alasan tertentu.

    Dalam kasus seperti melakukan query database, kemungkinannya adalah 2, data berhasil dikirim atau data gagal diambil (error).

    Sebuah promise dapat dibuat seperti menggunakan callback dengan menggunakan .then(), berikut adalah contoh penggunaan .then() dan .catch().

    const getFile = (fileName) => {
        return new Promise((resolve,reject) => {
            fs.readFile(fileName, (err,data) => {
                if(err){
                    reject(err);
                    return
                }
                resolve(data);
            })
        })
    }

    getFile('ininamafile').then(data => console.log(data)).catch(err => console.error(err));

    .then() akan berjalan ketika promise telah ter resolved.
    .catch() akan berjalan ketika promise telah ter rejected.

    Sekarang bagaimana untuk menggunakan promise untuk mengecek apakah 10 query diatas telah selesai semua atau belum ? Dapat digunakan Promise.all(), dimana Promise.all() akan menjalankan callback function jika sebuah promise telah selesai (RESOLVED SEMUANYA).

    const f1 = fetch('/something.json');
    const f2 = fetch('/something2.json');

    Promise.all([f1, f2])
    .then(res => {
        console.log('Array of results', res);
    })
    .catch(err ==> {
        console.error(err);
    });

    juga bisa menggunakan seperti berikut untuk mendapatkan hasil dari promise tersebut sendiri-sendiri :

    Promise.all([f1,f2]).then(([res1, res2]) => {
        console.log('Results', res1, res2);
    });
    
    Jika ditanyakan, dari 3 cara ini mana yang paling baik?. Ketiga cara berikut akan baik dalam kasusnya masing-masing. Jadi tergantung dari kasusnya, penggunaan ketiga cara diatas akan menjadi baik jika memang cocok dengan kasusnya. 

    p.s : Saran saya gunakan callback dan await saja untuk pengerjaan praktikum. Callback dan await lebih mudah untuk dipahami. Promise lebih kompleks akan tetapi penggunaannya sangat membantu dalam pengerjaan proyek skala besar.

    Note dari saya : 
    Harap penggunaan asynchronous di mengerti dengan benar-benar. Karena mayoritas error database biasanya berkaitan dengan asynchronous (Apalagi kalau sudah butuh query lebih dari 1 dalam 1 endpoint)

*/

//End of Penjelasan Asynchronous

const { query } = require("../database/database");

const getBooks = async (title) => {
    // return all books (status = true)
    // if title is provided, return the book with contains that title
    // else return all books
    let sql = "SELECT * FROM books WHERE status = 1";
    if (title) sql += " AND title LIKE '%" + title + "%'";
    let books = await query(sql, []);
    return books;
};
const getBook = async (id) => {
    // get a book by id
    let sql = "SELECT * FROM books WHERE id = ? AND status = 1";
    let book = (await query(sql, [id]))[0];
    return book;
};
const addBook = async (book) => {
    // add a new book
    let sql = "INSERT INTO books SET ?";
    let result = await query(sql, [book]);
    return result;
};
const updateBookById = async (updatedbook, id) => {
    // update a book
    let oldBook = await getBook(id);
    if (oldBook && oldBook.status) {
        let sql = "UPDATE books SET ? WHERE id = ?";
        let result = await query(sql, [updatedbook, id]);

        let newBook = await getBook(id);

        return {
            result,
            oldBook,
            newBook,
        };
    }
    return false;
};
const deleteBookById = async (id) => {
    // delete a book (change status to false)
    let oldBook = await getBook(id);
    if (oldBook && oldBook.status) {
        let sql = "UPDATE books SET status = 0 WHERE id = ?";
        let result = await query(sql, [id]);

        let newBook = await getBook(id);
        return {
            result,
            oldBook,
            newBook,
        };
    }
    return false;
};

module.exports = {
    getBooks,
    getBook,
    addBook,
    updateBookById,
    deleteBookById,
};
