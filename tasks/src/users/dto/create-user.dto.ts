import { IsEmail, IsNotEmpty, IsString, MinLength} from 'class-validator';

export class CreateUserDto {
    
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    nombre: string

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    correo: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    contraseña: string;
}
