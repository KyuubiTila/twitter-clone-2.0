import { IsString, IsOptional } from 'class-validator';

export class BaseProfileDto {
  @IsOptional()
  @IsString({ message: 'Bio must be a string' })
  bio: string;
}
