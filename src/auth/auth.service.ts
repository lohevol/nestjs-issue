import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Response } from 'express';
import { User, UserDocument } from './../schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private user_model: Model<UserDocument>){}

  async create_user(create_user_dto: CreateUserDto, response: Response){
    const { login, email, password } = create_user_dto;

    const same_user_login = this.user_model.findOne({ login })
    const same_user_email = this.user_model.findOne({ email })

    if(same_user_login) {
      response
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'Пользователь с таким логином уже существует' });
    }

    if(same_user_email) {
      response
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'Пользователь с таким адресом эл. почты уже существует' });
    }

    const hashed_password = await bcrypt.hash(password, 12);
    let created_user = new this.user_model({ ...create_user_dto, password: hashed_password });
    created_user = await created_user.save();

    response.status(HttpStatus.CREATED).json({ message: 'Пользователь создан', created_user });
  }
}
