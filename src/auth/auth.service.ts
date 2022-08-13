import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto, LoginDto } from "./dto";
import * as argon from "argon2";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable()
export class AuthService{
    constructor(private prisma : PrismaService){}

    /**
     * Login with user credentials, if success return the user
     * @param login 
     * @returns User
     */
    async login(login : LoginDto){

        const user = await this.prisma.user.findUnique({
            where: {
                email: login.email
            }
        });


        // if the user does not exist
        if(!user){
            return {};
        }

        // check th password
        const pwMatches = await argon.verify(user.password, login.password);

        if(!pwMatches){
            throw new ForbiddenException("Email or password invalid");
        }

        return user;
    }

    /**
     * Register a new user and retrun it
     * @param dto 
     * @returns User
     */
    async register(dto : AuthDto){
        const hash = await argon.hash(dto.password)
        const user_ = {
            nom : dto.nom,
            prenom : dto.prenom,
            email: dto.email,
            password: hash,
            image : dto.image   
        }

        try {


            const user = await this.prisma.user.create({
                data: user_ ,
                select: {
                    id: true,
                    nom: true,
                    prenom: true,
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