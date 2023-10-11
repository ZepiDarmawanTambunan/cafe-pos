const express = require('express');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv');
const SequelizeStore = require('connect-session-sequelize');
const path = require('path');

const db = require('./config/Database');
const UserRoute = require('./routes/UserRoute');
const ProductRoute = require('./routes/ProductRoute');
const AuthRoute = require('./routes/AuthRoute');

dotenv.config();
const app = express();
const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db
});

(async () => {
    try {
        await db.sync({alter: true});
        console.log('Koneksi ke database berhasil.');
    } catch (error) {
        console.error('Kesalahan koneksi ke database:', error);
    }
})();

// require('./seeders/UserSeeder');

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store,
    cookie: {
        secure: 'auto'
    }
}))

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

// izinkan agar react bisa akses http://localhost:5000/uploads/gambar.png
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);

// store.sync();

app.listen(process.env.APP_PORT, () => {
    console.log('running');
});