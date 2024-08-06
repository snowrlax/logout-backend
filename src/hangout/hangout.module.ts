import { Module } from '@nestjs/common';
import { HangoutService } from './hangout.service';
import { HangoutController } from './hangout.controller';

@Module({
  controllers: [HangoutController],
  providers: [HangoutService],
})
export class HangoutModule {}
