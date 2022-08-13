import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class AuthDto{
    @IsString()
    nom : string
    @IsString()
    prenom : string
    @IsEmail()
    @IsNotEmpty()
    email : string
    @IsString()
    @IsNotEmpty()
    password : string
    @IsString()
    image : string

}