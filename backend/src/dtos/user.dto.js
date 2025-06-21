module.exports = class UserDto {
    email;
    nickname;
    id;
    rating;

    constructor(model) {
        this.email = model.email;
        this.nickname = model.nickname;
        this.id = model.id;
        this.rating = model.rating;
    }
} 