import { Body, Controller, Get, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request } from "express";
import { FormDataRequest } from "nestjs-form-data";
import { Mailer } from "src/utils";
import { FileSaver } from "src/utils/files";
import { AuthService } from "./auth.service";
import { CreateUserDto, LoginUserDto } from "./dto";

@Controller("user")
export class AuthController{
    constructor(private service : AuthService){}

    @Get("login")
    login(@Body() login: LoginUserDto){
        return this.service.login(login);
    };

    @Post("register")
    @UseInterceptors(FileInterceptor("image", {
        storage: FileSaver.imageStorage()
    }))
    register( @Req() req: Request){
        let dto = new  CreateUserDto();
        dto.email = req.body.email;
        dto.firstname = req.body.firstname;
        dto.lastname = req.body.lastname;
        dto.password = req.body.password;
        dto.image = req.file.filename;
        return this.service.register(dto);
    };

    @Get("all")
    @UseGuards(AuthGuard("jwt"))
    users(@Req() req: Request){
        let mailer = new Mailer();
        mailer.confirmationMail(req.user);
        return this.service.allUser();
    };

}