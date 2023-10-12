const { Op } = require('sequelize');
const User = require('../models/UserModel');
require('dotenv').config();
const bcrypt = require('bcrypt');

const getUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10; // 1 page = 10 rows
        const search = req.query.search || "";
        const offset = limit * page; // misal page 0 maka (0*10 = 0), jika page 1 maka (1*10=10) maka start dari 10
        const totalRows = await User.count({
            where: {
                [Op.or]: [{name:{
                    [Op.like]: '%'+search+'%'
                }}, {email: {
                    [Op.like]: '%'+search+'%'
                }}]
            }
        }); // jumlah data sekeluruhan
        const totalPage = Math.ceil(totalRows/limit); // total seluruh data
        const result = await User.findAll({
            where: {
                [Op.or]: [{name: {
                    [Op.like]: '%'+search+'%'
                }}, {email: {
                    [Op.like]: '%'+search+'%'
                }}]
            },
            offset: offset,
            limit: limit,
            order: [
                ['id', 'DESC']
            ]
        }); // datanya
        
        res.status(200).json({
            result: result,
            page: page,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage
        });

        // cara lama
        // const response = await User.findAll({
        //     attributes: ['uuid', 'name', 'email', 'role']
        // });
        // res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

const getUserById = async (req, res) => {
    try {
        const response = await User.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

const createUser = async (req, res) => {
    const {name, email, password, confPassword, role} = req.body;
    if(password !== confPassword){
        return res.status(400).json({
            msg: "Password dan Confirm Password tidak valid"
        });
    }

    try {
        const saltRounds = parseInt(process.env.SALT_PASSWORD);
        const salt = await bcrypt.genSalt(saltRounds);
        const hashPassword = await bcrypt.hash(password, salt);
        
        await User.create({
            name,
            email,
            password: hashPassword,
            role
        });
        res.status(201).json({msg: 'Register berhasil'});
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            // Jika kesalahan adalah kesalahan validasi Sequelize
            const validationErrors = error.errors.map((e) => ({
              field: e.path,
              message: e.message,
            }));
            res.status(400).json({ errors: validationErrors });
          } else {
            // Kesalahan lainnya
            res.status(500).json({ message: 'Kesalahan server' });
          }
    }

};

const updateUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!user) return res.status(404).json({msg: 'User tidak ditemukan'});

        const {name, email, password, confPassword, role} = req.body;

        let hashPassword;
        if(password === "" || password === null){
            hashPassword = user.password;
        }else{
            const salt = await bcrypt.genSalt(parseInt(process.env.SALT_PASSWORD));
            hashPassword = await bcrypt.hash(password, salt);
        }
        if(password !== confPassword) return res.status(400).json({msg: 'Password dan Confirm password tidak valid'});

        await User.update({
            name,
            email,
            password: hashPassword,
            role
        }, {
            where: {
                id: user.id
            }
        });

        res.status(200).json({msg: "User updated"});
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            // Jika kesalahan adalah kesalahan validasi Sequelize
            const validationErrors = error.errors.map((e) => ({
              field: e.path,
              message: e.message,
            }));
            res.status(400).json({ errors: validationErrors });
          } else {
            // Kesalahan lainnya
            res.status(500).json({ message: 'Kesalahan server' });
        }
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
        await User.destroy({
            where: {
                id: user.id,
            }
        });
        res.status(200).json({msg: 'User deleted'});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};