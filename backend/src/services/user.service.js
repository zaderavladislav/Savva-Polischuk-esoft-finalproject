const bcrypt = require('bcrypt');
const { User, UserSetting } = require('../models');
const tokenService = require('./token.service');
const UserDto = require('../dtos/user.dto');

class UserService {
    async registration(email, nickname, password) {
        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            throw new Error(`Пользователь с email ${email} уже существует`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const user = await User.create({ email, nickname, password_hash: hashPassword });

        await UserSetting.create({ userId: user.id });

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('Пользователь с таким email не найден');
        }
        const isPassEquals = await bcrypt.compare(password, user.password_hash);
        if (!isPassEquals) {
            throw new Error('Неверный пароль');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new Error('Нет токена');
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw new Error('Невалидный токен');
        }
        const user = await User.findByPk(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto }
    }

    async getProfile(userId) {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('Пользователь не найден');
        }
        const userDto = new UserDto(user);
        return userDto;
    }

    async getAllUsers() {
        const users = await User.findAll();
        return users;
    }
}

module.exports = new UserService();