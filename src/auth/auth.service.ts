import { ForbiddenException, Injectable } from "@nestjs/common";
import { CreateUserDto, LoginUserDto } from "./dto";
import * as argon from "argon2";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { User } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService{
    constructor(
        private prisma : PrismaService,
        private jwt: JwtService
    ){}

    signToken(userId: any, email: string): Promise<string>
    {
        const payload = {userId, email};
        return this.jwt.signAsync(payload, {secret: process.env.JWT_SECRET, expiresIn: "6h"});
    }

    
    /**
     * Login with user credentials, if success return the user
     * @param login 
     * @returns {string, User}
     */
    async login(login : LoginUserDto){
        let user : User;
        user = await this.prisma.user.findUnique({
            where: {
                email: login.email
            }
        });


        // if the user does not exist
        if(!user){
            return {};
        }

        // check the password
        const pwMatches = await argon.verify(user.password, login.password);

        if(!pwMatches){
            throw new ForbiddenException("Email or password invalid");
        }

        const token = await this.signToken(user.id, user.email)

        return { _access_token: token, _user: user};
    }

    /**
     * Register a new user and retrun it
     * @param dto 
     * @returns User
     */
    async register(dto : CreateUserDto){
        const hash = await argon.hash(dto.password)
        const user_ = {
            firstname : dto.firstname,
            lastname : dto.lastname,
            email: dto.email,
            password: hash,
            image : dto.image   
        }

        try {


            const user = await this.prisma.user.create({
                data: user_ ,
                select: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    email: true,
                    isAdmin: true,
                    isConfirm: true
                }
            })      
            return user;        
        } catch (error) {
            if( error instanceof PrismaClientKnownRequestError){
                throw new ForbiddenException('crédential taken')
            }
            throw error;
        }
    }

    async allUser(){
        const users = await this.prisma.user.findMany();
        return users;
    }
}