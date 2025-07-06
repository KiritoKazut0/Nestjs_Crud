import { IsNotEmpty, IsString, IsIn, ValidateIf, IsUrl, Matches } from "class-validator";

export class CreateTaskDto {

    @IsString()
    @IsNotEmpty()
    user_id: string

    @IsString()
    @IsNotEmpty()
    titulo: string;


    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @ValidateIf(o => o.image !== undefined && o.image !== '')
    @IsUrl({}, {message: 'image must be a valid url'})
    image: string

    @IsString()
    @IsIn(['pendiente', 'en progreso', 'completada', 'cancelada'])
    status: 'pendiente' | 'en progreso' | 'completada' | 'cancelada';

}




