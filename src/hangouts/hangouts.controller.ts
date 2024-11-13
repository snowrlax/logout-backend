import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HangoutsService } from './hangout.service';

@ApiTags('Hangouts')
@Controller('hangouts')
export class HangoutsController {
  constructor(private readonly hangoutsService: HangoutsService) {}

  @Get()
  findAll() {
    return this.hangoutsService.findAll();
  }

  // get recommendedHangouts
  @Get('recommended/:userId')
  getRecommendedHangouts(@Param('userId') userId: string) {
    return this.hangoutsService.getRecommendedHangouts(userId);
  }

  // get nearbyHangouts
  @Get('nearby/:userId')
  getNearbyHangouts(@Param('userId') userId: string) {
    return this.hangoutsService.getNearbyHangouts(userId);
  }
}
