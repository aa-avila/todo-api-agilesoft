import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { TaskI } from './task.interface';
import { CreateTaskDto } from './dto/CreateTask.dto';
import { UpdateTaskDto } from './dto/UpdateTask.dto';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getAll(@Req() request): Promise<any> {
    const { userId } = request.user;
    return await this.tasksService.findAll(userId);
  }

  @Get(':id')
  async getOne(@Param('id') id: number, @Req() request): Promise<TaskI> {
    const { userId } = request.user;
    return await this.tasksService.findOne(id, userId);
  }

  @Post()
  async create(
    @Req() request,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskI> {
    const { userId } = request.user;
    return await this.tasksService.create(userId, createTaskDto);
  }

  @Patch(':id')
  async update(
    @Req() request,
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskI> {
    const { userId } = request.user;
    return await this.tasksService.update(id, userId, updateTaskDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Req() request): Promise<any> {
    const { userId } = request.user;
    const response = await this.tasksService.delete(id, userId);
    return {
      statusCode: HttpStatus.OK,
      message: response,
    };
  }
}
