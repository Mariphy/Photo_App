const { User } = require('../models/sequelize');

class UserService {

    constructor(sequelize) {
        this.client = sequelize;
        this.models = sequelize.models;
    }

    async createUser({firstName, lastName, email, password}) {
        try {
            const user = await this.models.User.create({
                firstName, 
                lastName, 
                email, 
                password
            });
            return user;
        } catch (error) {
            console.log(error)
            //throw new Error('Error creating user');
        }
    }

    async getUserById (id) {
        try {
            const user = await this.models.User.findByPk(id);
            return user;
        } catch (error) {
            throw new Error('Error fetching user');
        }
    }

    async updateUser(id, userData) {
        try {
            const user = await this.models.User.findByPk(id);
            if (user) {
                await user.update(userData);
                return user;
            }
            throw new Error('User not found');
        } catch (error) {
            throw new Error('Error updating user');
        }
    }

    async deleteUser(id) {
        try {
            const user = await this.models.User.findByPk(id);
            if (user) {
                await user.destroy();
                return true;
            }
            throw new Error('User not found');
        } catch (error) {
            throw new Error('Error deleting user');
        }
    }
};

module.exports = UserService;