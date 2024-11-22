import { BadRequestException, Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

import * as bcryptjs from "bcryptjs";
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly UserService: UsersService,
        private readonly jwtService: JwtService,
    ){}

    async register({name, email, password, dni}: RegisterDto){
        const user = await this.UserService.findOneByEmail(email);
        const userdni = await this.UserService.findOneByDni(dni);

        if (user && userdni){
            throw new BadRequestException("User already exist")
        }

        await this.UserService.create({
            name,
            email, 
            password: await bcryptjs.hash(password, 10),
            dni,
        });
    }

    async login({email, password, dni}: LoginDto){
        const user = await this.UserService.findOneByEmail(email);

        if(!user){
            throw new UnauthorizedException("Email is Wrong")
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password)
        if(!isPasswordValid){
            throw new UnauthorizedException("Password is Wrong")
        }

        const isDniValid = await this.UserService.findOneByDni(dni);
        if (!isDniValid) {
            throw new UnauthorizedException("DNI incorrecto");
        }

        const payload = { email: user.email, rol: user.rol};

        const token = await this.jwtService.signAsync(payload);
        
        return {
            token, email, dni, rol: user.rol,
        };
    }
}
