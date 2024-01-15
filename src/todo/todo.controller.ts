import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto, EditTodoDto, EditTodoStateDto } from './dto';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getTodoList() {
    return this.todoService.getTodoList();
  }

  @Get(':id')
  getTodoByid(@Param('id') todoId: string) {
    return this.todoService.getTodoByid(todoId);
  }

  @Post()
  createTodo(@Body() dto: CreateTodoDto) {
    return this.todoService.createTodo(dto);
  }

  // TODO: error
  // @Patch('content/:id')
  // editTodoContent(@Param('id') todoId: string, @Body() dto: EditTodoDto) {
  //   return this.todoService.editTodoContent(todoId, dto);
  // }

  @Patch('state/:id')
  editTodoState(@Param('id') todoId: string, @Body() dto: EditTodoStateDto) {
    return this.todoService.editTodoState(todoId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteTodoById(@Param('id') todoId: string) {
    return this.todoService.deleteTodo(todoId);
  }
}
