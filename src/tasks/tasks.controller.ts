import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  @Get()
  getAll() {
    return [1, 2, 3];
  }

  @Get(':id')
  getOne(@Param('id') taskId: number, @Body('userId') userId: number) {
    return { userId, taskId };
  }

  @Post()
  create(
    @Body('userId') userId: number,
    @Body('name') taskName: string,
    @Body('description') taskDesc: string,
    @Body('completed') taskComp: boolean,
  ) {
    return { userId, taskId: 123, taskName, taskDesc, taskComp };
  }

  @Patch(':id')
  update(
    @Param('id') taskId: number,
    @Body('userId') userId: number,
    @Body('name') taskName: string,
    @Body('description') taskDesc: string,
    @Body('completed') taskComp: boolean,
  ) {
    return { userId, taskId, taskName, taskDesc, taskComp };
  }

  @Delete(':id')
  delete(@Param('id') taskId: number, @Body('userId') userId: number) {
    return { userId, taskId };
  }
}
