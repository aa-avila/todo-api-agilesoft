import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { User } from '../users/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findAll(userId: number) {
    const tasks = await this.tasksRepository.find({
      where: { user: userId },
    });

    if (!tasks) {
      return [];
    }
    return tasks;
  }

  async findOne(id: number, userId: number) {
    const task = await this.getTaskAndVerify(id, userId);

    const { user, ...taskNoUser } = task;

    return taskNoUser;
  }

  async create(userId: number, data: any) {
    const userDb = await this.usersRepository.findOne(userId);

    const newTask = new Task();
    newTask.name = data.name;
    newTask.description = data.description;
    newTask.completed = data.completed;
    newTask.user = userDb;

    const savedTask = await this.tasksRepository.save(newTask);
    const { user, ...taskNoUser } = savedTask;

    return taskNoUser;
  }

  async update(id: number, userId: number, data: any) {
    const task = await this.getTaskAndVerify(id, userId);

    this.tasksRepository.merge(task, data);

    const savedTask = await this.tasksRepository.save(task);
    const { user, ...taskNoUser } = savedTask;

    return taskNoUser;
  }

  async delete(id: number, userId: number) {
    await this.getTaskAndVerify(id, userId);

    const response = await this.tasksRepository.delete(id);
    if (response.affected === 0) {
      throw new HttpException(
        'Delete operation failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return 'The task was successfully deleted';
  }

  private async getTaskAndVerify(id: number, userId: number): Promise<any> {
    const task = await this.tasksRepository.findOne(id, {
      relations: ['user'],
    });
    if (!task) {
      throw new HttpException(
        'The requested task does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    if (task.user.id !== userId) {
      throw new HttpException(
        'The requested task does not belong to this user',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return task;
  }
}
