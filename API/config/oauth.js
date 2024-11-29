import OAuth2Server from '@node-oauth/oauth2-server';
//import { findOne } from '../models/sequelize/user';
//import { findOne as _findOne, create } from '../models/sequelize/accessToken';
//import { findOne as __findOne } from '../models/sequelize/client';
//import { comparePassword } from '../utils/hash';

const oauth = {
  model: {
    getAccessToken: async (token) => {
        try {
          const accessToken = await _findOne({ where: { token } });
          return accessToken ? accessToken.toJSON() : null;
        } catch (error) {
          console.error('Error getting access token:', error);
          return null;
        }
    },
    getClient: async (clientId, clientSecret) => {
        try {
          const client = await __findOne({ where: { id: clientId, clientSecret } });
          return client ? client.toJSON() : null;
        } catch (error) {
          console.error('Error getting client:', error);
          return null;
        }
    },
    saveToken: async (token, client, user) => {
        try {
          const accessToken = await create({
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
          const user = await findOne({ where: { email } });
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

export default oauth;