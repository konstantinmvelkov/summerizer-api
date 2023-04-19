import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateHighlightDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  text: string;
}
