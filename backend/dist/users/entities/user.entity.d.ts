import { Comment } from '../../comment/entities/comment.entity';
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    rol: string;
    comments: Comment[];
    deletedAt: Date;
}
