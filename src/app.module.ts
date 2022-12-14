import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import {config} from 'src/utils/database.config';

@Global()
@Module({
  imports: [
    NestjsFormDataModule,
    AuthModule, 
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  providers: [AppService],
})
export class AppModule {}
