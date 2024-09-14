const OAuth2Server = require('@node-oauth/oauth2-server');
const User = require('../models/sequelize/user');
const AccessToken = require('../models/sequelize/accessToken');
const Client = require('../models/sequelize/client');
const { comparePassword } = require('../utils/hash');

const oauth = {
  model: {
    getAccessToken: async (token) => {
        try {
          const accessToken = await AccessToken.findOne({ where: { token } });
          return accessToken ? accessToken.toJSON() : null;
        } catch (error) {
          console.error('Error getting access token:', error);
          return null;
        }
    },
    getClient: async (clientId, clientSecret) => {
        try {
          const client = await Client.findOne({ where: { id: clientId, clientSecret } });
          return client ? client.toJSON() : null;
        } catch (error) {
          console.error('Error getting client:', error);
          return null;
        }
    },
    saveToken: async (token, client, user) => {
        try {
          const accessToken = await AccessToken.create({
            token: token.accessToken,
            clientId: client.id,
            userId: user.id,
            expires: token.accessTokenExpiresAt
          });
          return accessToken ? accessToken.toJSON() : null;
        } catch (error) {
          console.error('Error saving token:', error);
          return null;
        }
    },
    getUser: async (email, password) => {
        try {
          const user = await User.findOne({ where: { email } });
          if (user && await comparePassword(password, user.password)) {
            return user.toJSON();
          }
          return null;
        } catch (error) {
          console.error('Error getting user:', error);
          return null;
        }
    },
  },
};

module.exports = oauth;