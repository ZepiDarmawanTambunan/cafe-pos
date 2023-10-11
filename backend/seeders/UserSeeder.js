require('dotenv').config();
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const Users = require('../models/UserModel');

const seedUsers = async () => {
  try {
    const users = [];

    const saltRounds = parseInt(process.env.SALT_PASSWORD);
    const salt = await bcrypt.genSalt(saltRounds);
    
    for (let i = 1; i <= 1000; i++) {
        console.log(i+1);
      const user = {
        uuid: uuidv4(),
        name: `User ${i}`,
        email: `user${i}@gmail.com`,
        password: await bcrypt.hash(`password${i}`, salt),
        role: 'user',
      };
      users.push(user);
    }

    await Users.bulkCreate(users);
    console.log('Seeder: Users created successfully');
  } catch (error) {
    console.error('Seeder error:', error);
  }
};

seedUsers();