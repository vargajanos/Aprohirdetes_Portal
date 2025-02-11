import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity()
@Unique(["email"])
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false })
    name: string;
 
    @Column({ nullable: false })
    email: string;
 
    @Column({ nullable: true })
    address?: string;
 
    @Column({ nullable: false })
    password: string;

}
