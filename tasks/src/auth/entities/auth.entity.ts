import { Task } from "src/tasks/entities/task.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity('users')
export class User {
    
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: 'varchar', length: 50, nullable: false})
    nombre: string

    @Column({type: 'varchar', length: 50, nullable: false, unique: true})
    correo: string

    @Column({type: 'varchar', nullable: false})
    contraseña: string
    
    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[]
}





