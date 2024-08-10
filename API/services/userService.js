const { User } = require('../models/sequelize/index');

const userService = {
    createUser: async (userData) => {
        try {
            const user = await User.create(userData);
            return user;
        } catch (error) {
            throw new Error('Error creating user');
        }
    },

    getUserById: async (id) => {
        try {
            const user = await User.findByPk(id);
            return user;
        } catch (error) {
            throw new Error('Error fetching user');
        }
    },

    updateUser: async (id, userData) => {
        try {
            const user = await User.findByPk(id);
            if (user) {
                await user.update(userData);
                return user;
            }
            throw new Error('User not found');
        } catch (error) {
            throw new Error('Error updating user');
        }
    },

    deleteUser: async (id) => {
        try {
            const user = await User.findByPk(id);
            if (user) {
                await user.destroy();
                return true;
            }
            throw new Error('User not found');
        } catch (error) {
            throw new Error('Error deleting user');
        }
    },
};

module.exports = userService;