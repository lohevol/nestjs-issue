import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from '../../config/default';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(config.mongo_uri)
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
