const jwt = require('jsonwebtoken');
const { Token } = require('../models');

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({ where: { user_id: userId } });
        if (tokenData) {
            tokenData.refresh_token = refreshToken;
            return tokenData.save();
        }
        const token = await Token.create({ user_id: userId, refresh_token: refreshToken });
        return token;
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async findToken(refreshToken) {
        const tokenData = await Token.findOne({ where: { refresh_token: refreshToken } });
        return tokenData;
    }

    async removeToken(refreshToken) {
        const tokenData = await Token.destroy({ where: { refresh_token: refreshToken } });
        return tokenData;
    }
}

module.exports = new TokenService(); 