import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { FormDataRequest } from "nestjs-form-data";
import { AuthService } from "./auth.service";
import { CreateUserDto, LoginUserDto } from "./dto";

@Controller("user")
export class AuthController{
    constructor(private service : AuthService){}

    @Get("login")
    login(@Body() login: LoginUserDto){
        return this.service.login(login);
    }

    @Post("register")
    @FormDataRequest()
    register(@Body() dto : CreateUserDto){
        return this.service.register(dto);
    }

    @Get("all")
    users(){
        return this.service.allUser();
    }

}