import { BadRequestException, Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

import * as bcrypt from "bcryptjs";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ){}    

    async register( {name, email, password}: RegisterDto){
        const user = await this.usersService.findOneByEmail(email);
        
        if(user){
            throw new BadRequestException("User already exists");
        }

        return await this.usersService.create({
            name, 
            email, 
            password: await bcrypt.hash(password, 10)
        })
    }

    async login({email, password}){
        const user = await this.usersService.findOneByEmail(email);

        if(!user){
            throw new UnauthorizedException("Invalid email")
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            throw new UnauthorizedException("Invalid password")
        }

        const payload = { email: user.email}

        const token = await this.jwtService.signAsync(payload)

        return {
            token,
            email,
        };
    }
}
