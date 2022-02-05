import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}

  async findAll() {
    return await this.tasksRepository.find();
  }

  async findOne(id: number, userId: number) {
    return await this.tasksRepository.findOne(id);
  }

  async create(userId: number, data: any) {
    const newTask = this.tasksRepository.create(data);
    return await this.tasksRepository.save(newTask);
  }

  async update(id: number, userId: number, data: any) {
    const task = await this.tasksRepository.findOne(id);
    this.tasksRepository.merge(task, data);
    return await this.tasksRepository.save(task);
  }

  async delete(id: number, userId: number) {
    return await this.tasksRepository.delete(id);
  }
}
