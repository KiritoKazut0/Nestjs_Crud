import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<GetUserDto> {
    try {
      const isUserExist = await this.findByEmail(createUserDto.correo); 
      if (isUserExist) {
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
      }

      const { contraseña, ...userData } = createUserDto;
      const passwordToHash = await hash(contraseña, 10);
      const userToCreate = { ...userData, contraseña: passwordToHash };
      const newUser = await this.userRepository.save(userToCreate);

      return plainToInstance(GetUserDto, newUser, {
        excludeExtraneousValues: true,
      });

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(  'Error creating user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<GetUserDto[] | null> {
    try {
      const users = await this.userRepository.find();
        if (!users) {
          return null
        }
      return users.map(user =>
        plainToInstance(GetUserDto, user, {
          excludeExtraneousValues: true,
        })
      );
    } catch (error) {
      console.log(error)
      throw new HttpException('Error retrieving users', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<GetUserDto> {
    try {
      if (!id) {
        throw new HttpException('User ID is required', HttpStatus.BAD_REQUEST);
      }

      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return plainToInstance(GetUserDto, user, {
        excludeExtraneousValues: true,
      });

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error retrieving user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }



  async remove(id: string): Promise<{ message: string }> {
    try {
      
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      await this.userRepository.delete(id);
      return { message: 'User deleted successfully' };

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error deleting user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async findByEmail(email: string): Promise<User | null> {
    try {
      if (!email) {
        return null;
      }

      const user = await this.userRepository.findOneBy({ correo: email });
      return user;

    } catch (error) {
      throw new HttpException('Error finding user by email', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


}
