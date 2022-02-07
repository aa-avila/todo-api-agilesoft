import { Task } from 'src/tasks/task.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({ example: 23, description: 'The user ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'user4563', description: 'The username' })
  @Column({ length: 50, nullable: false, unique: true })
  username: string;

  @ApiProperty({ example: 'asdf1234', description: 'The user password' })
  @Column({ nullable: false, select: false })
  password: string;

  @ApiProperty({ example: 'Juan', description: 'The user firstname' })
  @Column({ length: 50, nullable: false })
  firstname: string;

  @ApiProperty({ example: 'Lopez', description: 'The user lastname' })
  @Column({ length: 50, nullable: false })
  lastname: string;

  @ApiProperty({
    example: '2022-02-07T15:11:45.847Z',
    description: 'Creation timestamp',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2022-02-07T15:11:45.847Z',
    description: 'Last update timestamp',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Task, (task: Task) => task.user)
  public tasks: Task[];
}
