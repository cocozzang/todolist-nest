import { IsOptional, IsString } from 'class-validator';

export class EditTodoDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
