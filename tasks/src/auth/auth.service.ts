import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/auth.entity';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { ResponseUserDto } from './dto/response-auth.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) { }

  async register(registerDto: RegisterAuthDto): Promise<{data: ResponseUserDto, token: string}> {
    try {
      const userExist = await this.findByEmail(registerDto.correo)
      if (userExist) {
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
      }


      const { contraseña, ...userData } = registerDto;
      const passwordToHash = await hash(contraseña, 10);
      const userToCreate = { ...userData, contraseña: passwordToHash };
      const newUser = await this.userRepository.save(userToCreate);
      
      const token = this.jwtService.sign({nombre : newUser.nombre})

      const data =  plainToInstance(ResponseUserDto, newUser, {
        excludeExtraneousValues: true,
      });

      return { data, token }


    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error creating user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(loginAuthDto: LoginAuthDto):Promise<{data: ResponseUserDto, token: string}> {
    const { correo, contraseña } = loginAuthDto;
    const user = await this.findByEmail(correo)
    if (!user) {
      throw new HttpException('User Not found', HttpStatus.NOT_FOUND);
    }

    const checkPassword = await compare(contraseña, user.contraseña);

    if (!checkPassword) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const token = this.jwtService.sign({nombre: user.nombre})

   const data = plainToInstance(ResponseUserDto, user, {
      excludeExtraneousValues: true,
    });

    return { data,  token }

  }

  private async findByEmail(correo: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ correo });
  }


}
