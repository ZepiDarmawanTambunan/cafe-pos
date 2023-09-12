const express = require('express');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv');

// const db = require('./config/Database');
const UserRoute = require('./routes/UserRoute');
const ProductRoute = require('./routes/ProductRoute');


dotenv.config();
const app = express();

// (async () => {
//     try {
//         await db.sync();
//         console.log('Koneksi ke database berhasil.');
//     } catch (error) {
//         console.error('Kesalahan koneksi ke database:', error);
//     }
// })();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto'
    }
}))

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);

app.listen(process.env.APP_PORT, () => {
    console.log('running');
});