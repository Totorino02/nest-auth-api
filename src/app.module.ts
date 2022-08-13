import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Global()
@Module({
  imports: [
    AuthModule, 
    PrismaModule,
    ConfigModule.forRoot({})
  ],
  providers: [AppService],
})
export class AppModule {}
