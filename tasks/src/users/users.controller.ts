import { Controller, Get, Post, Body, Param, Delete, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';


@Controller('users')

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
 async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
 async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
 async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }



  @Delete(':id')
 async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
