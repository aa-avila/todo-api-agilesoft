import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class Task {
  @ApiProperty({ example: 12, description: 'The task ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Do something', description: 'The task name' })
  @Column({ length: 50, nullable: false })
  name: string;

  @ApiProperty({
    example: 'Do that thing quickly',
    description: 'Task description',
  })
  @Column({ length: 250 })
  description: string;

  @ApiProperty({ example: false, description: 'The task completed-state' })
  @Column({ default: false, nullable: false })
  completed: boolean;

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

  @ManyToOne(() => User, (user: User) => user.tasks)
  public user: User;
}
