const userService = require('../services/user.service');

class UserController {
    async registration(req, res, next) {
        try {
            const { email, nickname, password } = req.body;
            if (!email || !password || !nickname) {
                return res.status(400).json({ message: 'Некорректные данные для регистрации' });
            }
            const userData = await userService.registration(email, nickname, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: e.message });
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: 'Некорректные данные для входа' });
            }
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: e.message });
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: e.message });
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: e.message });
        }
    }

    async getProfile(req, res, next) {
        try {
            const userId = req.user.id;
            const user = await userService.getProfile(userId);
            return res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController(); 