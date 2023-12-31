const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const validator = require('validator');

const login = async (req, res) => {
    try {
        const errors = [];
        if (!validator.isEmail(req.body.email)) {
            errors.push("Email tidak valid");
        }
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
        const match = await bcrypt.compare(req.body.password, user.password);
        if(!match) return res.status(400).json({msg: 'Wrong password'});
        req.session.userId = user.uuid;
        const uuid = user.uuid;
        const name = user.name;
        const email = user.email;
        const role = user.role;
        res.status(200).json({uuid, name, email, role});
    } catch (error) {
        res.status(500).json({msg: error.message});        
    }
}

const me = async (req, res) => {
    try {
        if(!req.session.userId){
            return res.status(401).json({msg:'Mohon login ke akun anda'})
        }
        const user = await User.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        });
        if(!user) return res.status(404).json({msg: "user tidak ditemukan"});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

const logout = (req, res) => {
    req.session.destroy((err) => {
        if(err) return res.status(400).json({msg: 'Tidak dapat logout'});
        res.status(200).json({msg: "anda berhasil logout"});
    });
}

module.exports = {
    login,
    me,
    logout
};