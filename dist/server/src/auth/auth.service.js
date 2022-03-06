"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./../schemas/user.schema");
const bcrypt = require('bcryptjs');
let AuthService = class AuthService {
    constructor(user_model) {
        this.user_model = user_model;
    }
    async create_user(create_user_dto, response) {
        const { login, email, password } = create_user_dto;
        const same_user_login = this.user_model.findOne({ login });
        const same_user_email = this.user_model.findOne({ email });
        if (same_user_login) {
            response
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json({ message: 'Пользователь с таким логином уже существует' });
        }
        if (same_user_email) {
            response
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json({ message: 'Пользователь с таким адресом эл. почты уже существует' });
        }
        const hashed_password = await bcrypt.hash(password, 12);
        let created_user = new this.user_model(Object.assign(Object.assign({}, create_user_dto), { password: hashed_password }));
        created_user = await created_user.save();
        response.status(common_1.HttpStatus.CREATED).json({ message: 'Пользователь создан', created_user });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map