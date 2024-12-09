import User from '../models/sequelize/user.js';
import { hashPassword } from '../utils/hash.js';

class UserService {

    constructor(sequelize) {
        this.client = sequelize;
        this.models = { User };
    }

    async createUser({firstName, lastName, email, password}) {
        const existingUser = await this.models.User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('User already exists');
        };
        try {
            const hashedPassword = await hashPassword(password);
            const user = await this.models.User.create({
                firstName, 
                lastName, 
                email, 
                password: hashedPassword
            });
            return user;
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error(`Error creating user: ${error.message}`);
        }
    }

    async getUsers() {
        try {
            const users = await this.models.User.findAll();
            return users;
        } catch (error) {
            throw new Error('Error fetching users');
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
                if(userData.password) {
                    const hashedPassword = await hashPassword(password);
                    userData.password = hashedPassword;
                }
                await user.update(userData);
                return user;
            }
            throw new Error('User not found');
        } catch (error) {
            console.error('Error updating user:', error);
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

export default UserService;