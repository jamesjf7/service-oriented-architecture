# Node JS & REST Service Basic

## Apa itu Node JS ? 

<p align='center'>
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png" width="300"/>
</p>
<br>


Node.js adalah platform buatan Ryan Dahl untuk menjalankan aplikasi web berbasis JavaScript yang dikenalkan pada tahun 2009. Dengan platform ini, Anda dapat menjalankan JavaScript dari sisi server.

Untuk mendukung kemampuan tersebut, Node.js dibangun dengan engine Javascript V8 milik Google.

Di samping itu, Node.js juga memiliki pustaka server sendiri sehingga Anda tidak perlu menggunakan program server web seperti Nginx dan Apache.

Untuk menginstall Node JS dapat mengikuti langkah-langkah yang ada di website resmi Node JS, yaitu https://nodejs.org/en/.

Untuk memeriksa apakah Node JS berhasil diinstall, dapat mengetikan perintah berikut di command prompt

    node -v
    npm -v

## Node Package Manager (NPM)
<p align='center'>
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/800px-Npm-logo.svg.png" width="300"/>
</p>
<br>

NPM adalah manajer package untuk Node JS. Peran NPM adalah untuk mengunduh dan menginstal package yang ada di internet dengan mudah dan cepat.  

Semua dependensi akan dicatat disebuah file .json dengan nama package.json. Untuk membuat file ini dengan menggunakan NPM (dengan menggunakan command prompt atau terminal), maka gunakan perintah “npm init”.

Saat melakukan penambahan dependensi akan ada tambahan flag (tulisan dibelakang perintah biasanya diawali dengan “--“). Flag “--save” digunakan untuk membuat entri package di dalam bagian dependensi dari file package.json. Saat menginstall package, NPM akan membuat file package-lock.json. File ini akan berisi daftar package dependensi beserta versi yang telah diinstall pada project

## REST (Representational State Transfer)
REST adalah singkatan dari Representational State Transfter. REST adalah arsitektur berbasis standar web dan menggunakan protocol HTTP.  REST menggunakan berbagai representasi untuk mewakili sumber daya teks, JSON, XML. Namun JSON adalah yang paling populer 

## Express.js
<p align='center'>
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--6NMqMyF---/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/6dnng3pre04xxdebia1g.png" width="300"/>
</p>
<br>
Express JS adalah framework dari NodeJS yang dirancang secara fleksibel dan sederhana untuk membantu tahap pengembangan aplikasi back end. Express JS juga sangat berbeda dengan framework Laravel, dimana library ini memberikan kebebasan bagi para developer untuk mendesain aplikasi, sehingga memungkinan bagi setiap pengembang memiliki rancangan arsitektur yang berbeda dalam software yang dibangun.

Fungsi-fungsi yang ditawarkan oleh Express JS adalah:
- Mengatur **request** dan **response**
- Setup **middleware** 
- **Template engine** untuk menghasilkan tampilan HTML
- Mengatur **routing** 
- etc.

### Request dan Response
#### Request Object Properties

<table>
<tr>
<th>Property</th>
<th>Description</th>
</tr>
<tr>
<td>req.method</td>
<td>Method yang digunakan untuk mengakses request</td>
</tr>
<tr>
<td>req.url</td>
<td>URL yang digunakan untuk mengakses request</td>
</tr>
<tr>
<td>req.path</td>
<td>Path yang digunakan untuk mengakses request</td>
</tr>
<tr>
<td>req.params</td>
<td>Parameter yang dikirimkan dari URL</td>
</tr>
<tr>
<td>req.query</td>
<td>Query string yang dikirimkan dari URL</td>
</tr>
<tr>
<td>req.body</td>
<td>Body dari request</td>
</tr>
<tr>
<td>req.files</td>
<td>File yang dikirimkan dari request</td>
</tr>
<tr>
<td>req.headers</td>
<td>Header yang dikirimkan dari request</td>
</tr>
<tr>
<td>req.ip</td>
<td>IP address yang mengakses request</td>
</tr>
</table>

#### Response Object Methods

<table>
<tr>
<th>Method</th>
<th>Description</th>
</tr>
<tr>
<td>res.send()</td>
<td>Mengirimkan response dalam bentuk string</td>
</tr>
<tr>
<td>res.json()</td>
<td>Mengirimkan response dalam bentuk JSON</td>
</tr>
<tr>
<td>res.render()</td>
<td>Mengirimkan response dalam bentuk HTML</td>
</tr>
<tr>
<td>res.download()</td>
<td>Mengirimkan response dalam bentuk file</td>
</tr>
<tr>
<td>res.redirect()</td>
<td>Mengirimkan response dalam bentuk redirect</td>
</tr>
<tr>
<td>res.status()</td>
<td>Mengatur status response</td>
</tr>
<tr>
<td>res.set()</td>
<td>Mengatur header response</td>
</tr>
</table>


## Method GET & POST
### Route Parameter (GET)
```node
// http://localhost:3000/users/1
app.get('/user/:id', function(req, res){
    res.send(req.params.id);
});
```


### Query String Parameter (GET)
```node    
// http://example.com/api/users?id=4&token=sdfa3&geo=us
app.get('/api/users', function(req, res) {
  const user_id = req.query.id;
  const token = req.query.token;
  const geo = req.query.geo;

  res.send({
    'user_id': user_id,
    'token': token,
    'geo': geo
  });
});

```

### Body Parameter (POST)

```node
// http://localhost:3000/user
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ...

app.post('/user', function(req, res){
    res.send(req.body.id);
});
```


## Postman
<p align='center'>
<img src="https://cdn.freelogovectors.net/wp-content/uploads/2020/12/postman-logo.png" width="300"/>
</p>
<br>

Postman adalah sebuah aplikasi yang berfungsi sebagai REST CLIENT untuk uji coba REST API. Postman biasa digunakan oleh developer pembuat API sebagai tools untuk menguji API yang telah mereka buat. untuk saat ini sudah banyak fitur-fitur yang sangat membantu dalam proses development API, diantaranya :
- **Collection**
Pengelompokan request API yang bisa disimpan atau diatur dalam bentuk folder. Memudahkan untuk pengelompokan request sesuai dengan proyek yang di kerjakan.
- **Environment**
Semacam config untuk menyimpan attribute dan attribute tersebut dapat digunakan ataupun dimanipulasi dalam proses request API.
- **Response**
Developer dapat membuat Mockup API sebelum benar-benar mengimplementasikan ke dalam proyek.
- **Mock Server**
Dengan fitur ini, Mockup API yang dibuat menggunakan fitur “example response” dapat diakses dari internet layaknya Mockup API tersebut sudah di implementasikan dan di deploy ke server.
- **Script Test**
Fitur untuk melakukan validasi respon, termasuk di dalamnya menuliskan test sesuai dengan kebutuhan.
- **Automated Test (Runner)**
Menjalakan request dalam satu collection secara otomatis, dengan menggunakan script test.




