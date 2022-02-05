import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number, @Body('userId') userId: number) {
    // return { userId, taskId };
    return await this.tasksService.findOne(id, userId);
  }

  @Post()
  async create(
    @Body('userId') userId: number,
    @Body('name') name: string,
    @Body('description') description: string,
  ) {
    return await this.tasksService.create(userId, { name, description });
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body('userId') userId: number,
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('completed') completed: boolean,
  ) {
    return await this.tasksService.update(id, userId, {
      name,
      description,
      completed,
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Body('userId') userId: number) {
    return await this.tasksService.delete(id, userId);
  }
}
