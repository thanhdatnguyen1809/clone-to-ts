import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        length: 60,
        
    })
    name!: string

    @Column()
    completed!: boolean
}

