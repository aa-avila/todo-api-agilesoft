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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Task } from './task.entity';
import { TaskI } from './task.interface';
import { CreateTaskDto } from './dto/CreateTask.dto';
import { UpdateTaskDto } from './dto/UpdateTask.dto';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Tasks')
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @Get()
  async getAll(@Req() request): Promise<any> {
    const { userId } = request.user;
    return await this.tasksService.findAll(userId);
  }

  @ApiOperation({ summary: 'Get one task' })
  @ApiResponse({
    status: 200,
    type: Task,
    description: 'OK',
  })
  @Get(':id')
  async getOne(@Param('id') id: number, @Req() request): Promise<TaskI> {
    const { userId } = request.user;
    return await this.tasksService.findOne(id, userId);
  }

  @ApiOperation({ summary: 'Create task' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({
    status: 200,
    type: Task,
    description: 'Task created',
  })
  @Post()
  async create(
    @Req() request,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskI> {
    const { userId } = request.user;
    return await this.tasksService.create(userId, createTaskDto);
  }

  @ApiOperation({ summary: 'Update task' })
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({
    status: 200,
    type: Task,
    description: 'Task updated',
  })
  @Patch(':id')
  async update(
    @Req() request,
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskI> {
    const { userId } = request.user;
    return await this.tasksService.update(id, userId, updateTaskDto);
  }

  @ApiOperation({ summary: 'Delete one Task' })
  @ApiResponse({
    status: 200,
    description: 'Task deleted',
  })
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
