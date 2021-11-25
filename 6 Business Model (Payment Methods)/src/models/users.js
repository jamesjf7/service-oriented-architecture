const dbase = require('../connection')

const addNew = async(nama) => {

    //jadi api ini soal bussiness model. tiap user punya API key sendiri da punya API HIT.
    //bentuk API key bebas, di tutor ini pakai 5 digit saja. Panjangnya bisa beda tiap project, trus disimpen di database
    //di tutor ini defaultnya user dapat 10 api hit.
    let generateAPIKEY = Math.floor(Math.random()*90000) + 10000;
    let qry = `insert into users values('',?,?,10)`
    let result = await dbase.executeQueryWithParam(qry,[nama,generateAPIKEY])
    return {
        message: "Berhasil insert"
    }
}

const getAll = async(key) => {
    //nah tiap nge get, API hit nya kurangin. nguranginnya bebas tergantung sistem / soalnya saja. klo ndak cukup kasih pesan error suruh topup, gtu aja inti dari m6. cara nambh api hitnya gimana? ez. tinggal update db nya aja. ndak dikasih contoh karena tinggal query doang kek minggu 2
    let qry = `select api_hit from users where api_key = ?`
    let resultGet = await dbase.executeQueryWithParam(qry,[key])
    console.log(resultGet);
    //cek user nya ketemu ndak dari key yang dilempar
    if(resultGet.length==0) {
        return {
            message: "User tidak ditemukan"
        }
    }
    else {
        //misal waktu ngeakses endpoint get ini, api hit nya dikurangi 10. trus dicek cukup ndak hitnya
        if(parseInt(resultGet[0].api_hit) - 10 <0) {
            //klo kurang...
            return {
                message: "Hit kurang"
            }
        }
        else {
            //klo ndak kurang, kurangi
            qry = `update users set api_hit=api_hit-10 where api_key = ?`
            let result2 = await dbase.executeQueryWithParam(qry,[key])
            //trus kembalikan semua usernya
            //done. penjelasan nya itu saja
            let qryUser = `select * from users`
            let resultUsers = await dbase.executeQuery(qryUser)
            return({
                message:resultUsers
            })
        }
    }
}

module.exports= {
    'addNew':addNew,
    'getAll':getAll
}