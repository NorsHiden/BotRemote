import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    userID: string;
    
    @Column()
    displayName: string;

    @Column()
    accessToken: string;

    @Column()
    refreshToken: string;

    @Column()
    isLoggedIn: boolean;
}