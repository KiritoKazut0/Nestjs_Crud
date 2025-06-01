import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"


export class LoginAuthDto {

    @IsEmail()
    @IsNotEmpty()
    correo: string

    @IsNotEmpty()
    @MinLength(4)
    @IsString()
    contraseña: string

}
