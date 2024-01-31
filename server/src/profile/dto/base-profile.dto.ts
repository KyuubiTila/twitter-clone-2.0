import { IsString, IsOptional } from 'class-validator';

export class BaseProfileDto {
  @IsOptional()
  @IsString({ message: 'Bio must be a string' })
  bio: string;

  @IsOptional()
  @IsString({ message: 'Image must be a string' })
  image: string;
}
