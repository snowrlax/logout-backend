import { Module } from '@nestjs/common';
import { ProfessionalHangoutController } from './professional-hangout.controller';
import { ProfessionalHangoutService } from './professional-hangout.service';

@Module({
  controllers: [ProfessionalHangoutController],
  providers: [ProfessionalHangoutService],
})
export class ProfessionalHangoutModule {}
