import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PaginationOptionsInterface } from "src/pagination/pagination.options.interface";
import { Pagination } from 'src/pagination/pagination';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<CreateUserDto & User>;
    findOneByEmail(email: string): Promise<User>;
    findOneByRol(rol: string): Promise<User>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
    paginate(options: PaginationOptionsInterface): Promise<Pagination<User>>;
}
