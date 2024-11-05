import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<void>;
    login(loginDto: loginDto): Promise<{
        token: string;
        email: string;
    }>;
    profile(req: any): any;
}
