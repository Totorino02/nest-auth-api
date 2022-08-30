import { ForbiddenException, Injectable } from "@nestjs/common";
import { CreateUserDto, LoginUserDto } from "./dto";
import * as argon from "argon2";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Prisma, User } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import { networkInterfaces } from "os";

@Injectable()
export class AuthService{
    constructor(
        private prisma : PrismaService,
        private jwt: JwtService
    ){}

    signToken(userId: any, email: string): Promise<string>
    {
        const payload = {userId, email};
        return this.jwt.signAsync(payload, {secret: process.env.JWT_SECRET, /* expiresIn: "6h" */});
    }

    async createConfirmation(_user : Prisma.UserConfirmationUncheckedCreateInput){
        const confirmationAccount = await this.prisma.userConfirmation.create({
            data: _user
        })

        return confirmationAccount;
    }

    async accountConfirmation(_user: User){
        const token = await this.signToken(_user.id, _user.email);
        
        let expireAt = new Date();
        expireAt.setDate(expireAt.getTime()+ 24*3600);

        try {
            /* this.prisma.userConfirmation.deleteMany({
                where: {
                    userId: _user.id
                }
            }) */
    
            const confirmationAccount = this.createConfirmation({userId: 1/* _user.id */, expireAt: expireAt });
            return confirmationAccount;
        } catch (error) {
            if( error instanceof PrismaClientKnownRequestError){
                console.log(error)
                throw new ForbiddenException('an error occur where creating your account. Please contact thr technical support for assistance');
            }
            throw error;
        }




    }

    async justTest(data: any){
        let expireAt = new Date();
        expireAt.setDate(expireAt.getTime()+ 24*3600);
        try {
            return await this.prisma.userConfirmation.create({
                data:{
                    expireAt: expireAt,
                    userId: data.userId
                }// 
            });
        } catch (error) {
            console.log(error)
        }
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

        console.log(dto)

        try {  
            const user = await this.prisma.user.create({
                data: user_ ,
            });
            
            const confirmationAccount = this.accountConfirmation(user);
            return confirmationAccount;  
    
        } catch (error) {
            if( error instanceof PrismaClientKnownRequestError){
                throw new ForbiddenException('crédential taken');
            }
            throw error;
        }

        
    }

    async allUser(){
        const users = await this.prisma.user.findMany();
        return users;
    }
}