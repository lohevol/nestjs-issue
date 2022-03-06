import { Model } from 'mongoose';
import { Response } from 'express';
import { UserDocument } from './../schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
export declare class AuthService {
    private user_model;
    constructor(user_model: Model<UserDocument>);
    create_user(create_user_dto: CreateUserDto, response: Response): Promise<void>;
}
