import { PartialType } from '@nestjs/swagger';
import { CreateHostReviewDto } from './create-review.dto';

export class UpdateReviewDto extends PartialType(CreateHostReviewDto) {}
