import { Exclude, Expose } from 'class-transformer';

export class ResponseUserDto {
  @Expose()
  id: string;

  @Expose()
  nombre: string;

  @Expose()
  correo: string;

  @Exclude()
  contraseña?: string;

  @Expose()
  token: string

  constructor(partial: Partial<ResponseUserDto>) {
    Object.assign(this, partial);
  }
}