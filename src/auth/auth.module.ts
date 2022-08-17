import { Module } from "@nestjs/common";
import { NestjsFormDataModule } from "nestjs-form-data";
import { PrismaModule } from "src/prisma/prisma.module";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [NestjsFormDataModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule{}