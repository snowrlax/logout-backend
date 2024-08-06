import { Module } from '@nestjs/common';
import { CasualHangoutService } from './casual-hangout.service';
import { CasualHangoutController } from './casual-hangout.controller';

@Module({
  controllers: [CasualHangoutController],
  providers: [CasualHangoutService],
})
export class CasualHangoutModule {}
