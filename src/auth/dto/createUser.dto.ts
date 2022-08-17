import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateUserDto{
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