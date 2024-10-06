import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import {
  CreateHangoutReviewDto,
  CreateHostReviewDto,
  CreateUserReviewDto,
} from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('participant')
  createUserRating(@Body() createReviewDto: CreateUserReviewDto) {
    return this.reviewService.createUserRating(createReviewDto);
  }

  @Post('host')
  createHostRating(@Body() createReviewDto: CreateHostReviewDto) {
    return this.reviewService.createHostRating(createReviewDto);
  }

  @Post('hangout')
  createHangoutRating(
    @Param('id') id: string,
    @Body() createReviewDto: CreateHangoutReviewDto,
  ) {
    return this.reviewService.createHangoutRating(createReviewDto);
  }

  @Get('participant/:id')
  findParticipantReviews(@Param('id') id: string) {
    return this.reviewService.findParticipantReviews(id);
  }

  @Get('host/:id')
  findHostReviews(@Param('id') id: string) {
    return this.reviewService.findHostReviews(id);
  }

  @Get('host/categoryWise/:category/:id')
  findHostCategoryWiseReviews(
    @Param('category') category: string,
    @Param('id') id: string,
  ) {
    return this.reviewService.findHostCategoryWiseReviews(category, id);
  }

  @Get('host/categoryWise/:category/:id')
  findParticipantCategoryWiseReviews(
    @Param('category') category: string,
    @Param('id') id: string,
  ) {
    return this.reviewService.findParticipantCategoryWiseReviews(category, id);
  }

  @Get('hangout/:id')
  findHangoutReviews(@Param('id') id: string) {
    return this.reviewService.findHangoutReviews(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}
