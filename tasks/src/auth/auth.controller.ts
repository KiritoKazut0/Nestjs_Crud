import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() userData: RegisterAuthDto) {
    return this.authService.register(userData);
  }

  @Post('/login')
  login(@Body() userData: LoginAuthDto ) {
    return this.authService.login(userData);
  }


}
