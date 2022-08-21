import { IsEmail, IsEmpty, IsNotEmpty, IsString } from "class-validator"

export class CreateUserDto{
    @IsString()
    firstname : string
    @IsString()
    lastname : string
    @IsEmail()
    @IsNotEmpty()
    email : string
    @IsString()
    @IsNotEmpty()
    password : string
    @IsString()
    image : string

}