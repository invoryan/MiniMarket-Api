import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Matches } from "class-validator";

export class CreateUserDto {
    
    @IsString()
    @IsNotEmpty()
    readonly name: string

    @IsString()
    @IsNotEmpty()
    readonly lastname: string

    @IsEmail()
    @IsString() 
    @IsNotEmpty()
    readonly email:string

    @IsStrongPassword()
    @IsString()
    @IsNotEmpty()
    readonly password: string
}