const User = require('../models/user');

class UserDAO {
    // Create a new user
   static async createUser(userData) {
        try {
            console.log('userData', userData);
            const newUser = new User(userData);
            const savedUser = await newUser.save();
            return savedUser;
        } catch (error) {
            throw new Error(`Failed to create user: ${error.message}`);
        }
    }


    // Get all users
  static  async getAllUsers() {
        try {
            const users = await User.find();
            return users;
        } catch (error) {
            throw new Error(`Failed to get users: ${error.message}`);
        }
    }

    // Get a user by email and password
  static  async getUserByEmailAndPassword(email, password) {
        try {
            const user = await User.findOne({ email, password });
            return user;
        } catch (error) {
            throw new Error(`Failed to get user: ${error.message}`);
        }
    }

    // Get a user by ID
static async getUserById(userId) {
        try {
            const user = await User.findById(userId);
            return user;
        } catch (error) {
            throw new Error(`Failed to get user: ${error.message}`);
        }
    }

    // Update a user by ID
 static async updateUserById(userId, userData) {
        try {
            const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
            return updatedUser;
        } catch (error) {
            throw new Error(`Failed to update user: ${error.message}`);
        }
    }

    // Delete a user by ID
 static async deleteUserById(userId) {
        try {
            const deletedUser = await User.findByIdAndDelete(userId);
            return deletedUser;
        } catch (error) {
            throw new Error(`Failed to delete user: ${error.message}`);
        }
    }
}

module.exports = UserDAO;