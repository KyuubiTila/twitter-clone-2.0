import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentBookmarkDto } from './create-comment-bookmark.dto';

export class UpdateCommentBookmarkDto extends PartialType(CreateCommentBookmarkDto) {}
