import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private auth_service: AuthService){}

  @Post('register')
  async register(@Body() create_user_dto: CreateUserDto, @Res() response: Response) {
    this.auth_service.create_user(create_user_dto, response);
  }
}
