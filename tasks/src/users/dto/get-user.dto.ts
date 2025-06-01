import { Exclude, Expose } from 'class-transformer';

export class GetUserDto {
  @Expose()
  id: string;

  @Expose()
  nombre: string;

  @Expose()
  correo: string;

  @Exclude()
  contraseña?: string;

  constructor(partial: Partial<GetUserDto>) {
    Object.assign(this, partial);
  }
}