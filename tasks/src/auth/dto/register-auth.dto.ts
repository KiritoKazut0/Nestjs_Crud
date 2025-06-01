import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"


export class RegisterAuthDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    nombre: string

    @IsEmail()
    @IsNotEmpty()
    correo: string

    @IsNotEmpty()
    @MinLength(4)
    @IsString()
    contraseña: string

}
