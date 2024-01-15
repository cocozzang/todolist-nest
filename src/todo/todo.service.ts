import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { EditTodoDto, EditTodoStateDto } from './dto';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async getTodoList() {
    try {
      const todolist = await this.prisma.todo.findMany({});

      return { data: todolist, status: 200 };
    } catch (error) {
      console.log(error);

      return error;
    }
  }

  async getTodoByid(todoId: string) {
    try {
      const todo = await this.prisma.todo.findUnique({
        where: { id: todoId },
      });

      return { data: todo, status: 200 };
    } catch (error) {
      console.log(error);

      return error;
    }
  }

  async createTodo(dto: CreateTodoDto) {
    try {
      const todo = await this.prisma.todo.create({
        data: {
          title: dto.title,
          description: dto.description,
        },
      });

      return { data: todo, status: 201 };
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  // TODO: createPrismaData 로직 error 이후 update
  // async editTodoContent(todoId: string, dto: EditTodoDto) {
  //   try {
  //     const isTodoExist = await this.prisma.todo.findUnique({
  //       where: {
  //         id: todoId,
  //       },
  //     });

  //     if (!isTodoExist)
  //       throw new NotFoundException('해당 todo는 존재하지않습니다.');

  //     const createPrismaData = () => {
  //       let obj:
  //         | { title: string }
  //         | { description: string }
  //         | { title: string; description: string }
  //         | {};

  //       obj = Object.assign(
  //         {},
  //         ...Object.keys(dto).map((key) => ({ [key]: dto[key] })),
  //       );
  //       return obj;
  //     };

  //     const data = createPrismaData();

  //     const todo = await this.prisma.todo.update({
  //       where: {
  //         id: isTodoExist.id,
  //       },
  //       data,
  //     });

  //     return { data: todo, status: 200 };
  //   } catch (error) {
  //     console.log(error);

  //     return error;
  //   }
  // }

  async editTodoState(todoId: string, dto: EditTodoStateDto) {
    const isTodoExist = await this.prisma.todo.findUnique({
      where: {
        id: todoId,
      },
    });

    if (!isTodoExist)
      throw new NotFoundException('해당 todo는 존재하지않습니다.');

    const todo = await this.prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        state: dto.state,
      },
    });

    return { data: todo, status: 200 };
  }

  async deleteTodo(todoId: string) {
    await this.prisma.todo.delete({
      where: {
        id: todoId,
      },
    });

    return null;
  }
}
