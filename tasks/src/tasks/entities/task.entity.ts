import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { User } from "src/users/entities/user.entity"

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => User,
        (user) => user.tasks, {
        nullable: false,
        onDelete: 'CASCADE'

    })
    @JoinColumn({name: 'user_id'})
    user: User

    @Column({ type: "varchar", nullable: false })
    titulo: string

    @Column({ type: "varchar", nullable: false })
    descripcion: string

    @Column({type: "varchar", nullable: false})
    image: string

    @Column({
        type: "enum",
        enum: ['pendiente', 'en progreso', 'completada', 'cancelada'],
        default: "pendiente"
    })
    status: 'pendiente' | 'en progreso' | 'completada' | 'cancelada';
}
