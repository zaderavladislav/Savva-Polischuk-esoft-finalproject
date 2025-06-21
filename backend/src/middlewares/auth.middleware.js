const tokenService = require('../services/token.service');

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(401).json({ message: 'Пользователь не авторизован' });
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return res.status(401).json({ message: 'Пользователь не авторизован' });
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return res.status(401).json({ message: 'Пользователь не авторизован' });
        }

        req.user = userData;
        next();
    } catch (e) {
        return res.status(401).json({ message: 'Пользователь не авторизован' });
    }
}; 