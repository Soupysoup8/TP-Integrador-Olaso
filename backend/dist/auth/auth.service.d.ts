import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly UserService;
    private readonly jwtService;
    constructor(UserService: UsersService, jwtService: JwtService);
    register({ name, email, password }: RegisterDto): Promise<void>;
    login({ email, password }: loginDto): Promise<{
        token: string;
        email: string;
        rol: string;
    }>;
}
