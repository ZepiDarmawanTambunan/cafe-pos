const Product = require('../models/ProductModel');
const User = require('../models/UserModel');
const {Op} = require('sequelize');
const fs = require('fs');
const path = require('path');

const getProducts = async(req, res) => {
    try {
        let response;
        if(req.role === 'admin'){
            response = await Product.findAll({
                attributes: ['uuid', 'name', 'price', 'image'],
                include: [{
                    model: User,
                    attributes: ['name', 'email'],
                }]
            });
        }else{
            response = await Product.findAll({
                attributes: ['uuid', 'name', 'price', 'image'],
                where:{
                    userId: req.userId,
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email'],
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

const getProductById = async(req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!product) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === 'admin'){
            response = await Product.findOne({
                attributes: ['uuid', 'name', 'price', 'image'],
                where: {
                    id: product.id,
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email'],
                }],
            });
        }else{
            response = await Product.findOne({
                attributes: ['uuid', 'name', 'price', 'image'],
                where:{
                    [Op.and]: [{id: product.id}, {userId: req.userId}]
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email'],
                }],
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

const createProduct = async(req, res) => {
    const {name, price} = req.body;
    try {
        let image = null;

        if(req.file){
            const {filename} = req.file;
            image = filename;
        }

        await Product.create({
            name,
            price,
            userId: req.userId,
            image
        });
        res.status(201).json({msg: 'product created success'});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

const updateProduct = async (req, res) => {
    try {
      const product = await Product.findOne({
        where: {
          uuid: req.params.id,
        },
      });
  
      if (!product) return res.status(404).json({ msg: 'Data tidak ditemukan' });
      const { name, price } = req.body;
  
      let oldImage = product.image;
      let newImage = null;
      if (req.file) {
        const { filename } = req.file;
        newImage = filename;
      }
      if (oldImage && newImage) {
        const rootProjectPath = process.cwd(); // Mendapatkan path root project
        const filePathToDelete = path.join(rootProjectPath, 'uploads', oldImage);

        if (fs.existsSync(filePathToDelete)) {
          fs.unlink(filePathToDelete, (err) => {
            if (err) {
              console.error('Gagal menghapus file:', err);
            } else {
              console.log('File berhasil dihapus:', oldImage);
            }
          });
        } else {
          console.error('File tidak ditemukan:', oldImage);
        }
      }

      if (req.role === 'admin' || req.userId === product.userId) {
        if(newImage){
          await Product.update({ name, price, image: newImage }, {
            where: {
              id: product.id,
            },
          });
        }else{
          await Product.update({ name, price}, {
            where: {
              id: product.id,
            },
          });
        }
        res.status(200).json({ msg: 'Product updated successfully' });
      } else {
        res.status(403).json({ msg: 'Akses terlarang' });
      }
    } catch (error) {
      res.status(500).json({ msg: 'Terjadi kesalahan dalam menghapus produk' });
    }
  };

  const deleteProduct = async (req, res) => {
    try {
      const product = await Product.findOne({
        where: {
          uuid: req.params.id,
        },
      });
      if (!product) return res.status(404).json({ msg: 'Data tidak ditemukan' });
  
      if (req.role === 'admin' || req.userId === product.userId) {
        // Hapus gambar terkait jika ada
        if (product.image) {
          const rootProjectPath = process.cwd(); // Mendapatkan path root project
          const filePathToDelete = path.join(rootProjectPath, 'uploads', product.image);

          if (fs.existsSync(filePathToDelete)) {
            fs.unlink(filePathToDelete, (err) => {
              if (err) {
                console.error('Gagal menghapus file:', err);
              } else {
                console.log('File berhasil dihapus:', product.image);
              }
            });
          } else {
            console.error('File tidak ditemukan:', product.image);
          }
        }
  
        await Product.destroy({
          where: {
            id: product.id,
          },
        });
  
        res.status(200).json({ msg: 'Product deleted successfully' });
      } else {
        res.status(403).json({ msg: 'Akses terlarang' });
      }
    } catch (error) {
      console.error(error); // Tampilkan error di konsol
      res.status(500).json({ msg: 'Terjadi kesalahan dalam menghapus produk' });
    }
  };

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}