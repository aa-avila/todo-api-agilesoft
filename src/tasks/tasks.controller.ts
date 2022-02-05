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
  async getOne(@Param('id') id: number, @Req() request): Promise<any> {
    const { userId } = request.user;
    return await this.tasksService.findOne(id, userId);
  }

  @Post()
  async create(
    @Req() request,
    @Body('name') name: string,
    @Body('description') description: string,
  ) {
    const { userId } = request.user;
    return await this.tasksService.create(userId, { name, description });
  }

  @Patch(':id')
  async update(
    @Req() request,
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('completed') completed: boolean,
  ) {
    const { userId } = request.user;
    return await this.tasksService.update(id, userId, {
      name,
      description,
      completed,
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Req() request) {
    const { userId } = request.user;
    const response = await this.tasksService.delete(id, userId);
    return {
      statusCode: HttpStatus.OK,
      message: response,
    };
  }
}
