import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class AuthController {
    private auth_service;
    constructor(auth_service: AuthService);
    register(create_user_dto: CreateUserDto, response: Response): Promise<void>;
}
