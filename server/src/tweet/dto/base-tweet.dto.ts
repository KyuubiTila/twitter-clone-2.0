import { IsNotEmpty, IsString } from 'class-validator';

export class BaseTweetDto {
  @IsNotEmpty()
  @IsString()
  content: string;
}
