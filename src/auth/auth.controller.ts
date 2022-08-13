import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto, LoginDto } from "./dto";

@Controller("user")
export class AuthController{
    constructor(private service : AuthService){}

    @Get("login")
    login(@Body() login: LoginDto){
        return this.service.login(login);
    }

    @Post("register")
    register(@Body() dto : AuthDto){
        return this.service.register(dto);
    }

    @Get("all")
    users(){
        return this.service.allUser();
    }

}