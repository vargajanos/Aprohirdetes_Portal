import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Advertisement{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, (user) => user.id, {eager: true})
    @JoinColumn({name: "userId"})
    user:User

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
    date: Date;
    
    @Column({ type: "enum", enum: ["ingatlan", "gépjármű", "háztartási gép", "játék", "ruha", "elektronika", "sport", "bútor", "szerszám"]})
    category: string;

    @Column ({length: 100, nullable: false})
    title:string

    @Column({type: "text", nullable: false})
    description:string

    @Column ({type: 'double', nullable: false})
    price:number

    @Column ({type:"text"})
    image?:string

}