import { IsBoolean } from 'class-validator';

export class EditTodoStateDto {
  @IsBoolean()
  state: boolean;
}
