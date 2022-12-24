import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    AdminModule,
    MongooseModule.forRoot('mongodb://localhost:27017/sampleDB'),
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
  ],
})
export class AppModule {}
