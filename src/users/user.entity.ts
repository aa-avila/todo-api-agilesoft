import { Task } from 'src/tasks/task.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false, unique: true })
  username: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ length: 50, nullable: false })
  firstname: string;

  @Column({ length: 50, nullable: false })
  lastname: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Task, (task: Task) => task.user)
  public tasks: Task[];
}
