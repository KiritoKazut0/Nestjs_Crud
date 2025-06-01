import { IsNotEmpty, IsString, IsIn } from "class-validator";

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

    @IsString()
    @IsIn(['pendiente', 'en progreso', 'completada', 'cancelada'])
    status: 'pendiente' | 'en progreso' | 'completada' | 'cancelada';
}




