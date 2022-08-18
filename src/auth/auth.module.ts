import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { NestjsFormDataModule } from "nestjs-form-data";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategy";

@Module({
    imports: [
        NestjsFormDataModule,
        JwtModule.register({})
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule{}