//variable dbase menampung function-function yang diexport dari connection.js,
const dbase = require('../connection')

//addNew untuk menambahkan data baru ke dalam database
//perlu diingat, field yang ada pada database adalah id (auto increment), nama dan direktori foto
//karena id adalah auto increment, jadi parameter untuk query nya di kosongkan saja (diisi dengan '')
// lalu parameter kedua nya adalah nama, diikuti dengan direktori
const addNew = async(nama,foto) => {
    let qry = `insert into user values('',?,?)`
    //executeQueryWithParam merupakan fungsi milik variable dbase
    //parameter pertama: sintax query
    //parameter kedua: parameter dari query yang akan menggantikan tanda tanya pada query
    //parameter ketiga: database connection
    let result = await dbase.executeQueryWithParam(qry,[nama,foto])
    return "Berhasil insert"
}

module.exports= {
    'addNew':addNew
}