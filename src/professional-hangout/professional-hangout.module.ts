import { Module } from '@nestjs/common';
import { ProfessionalHangoutController } from './professional-hangout.controller';
import { ProfessionalHangoutService } from './professional-hangout.service';
import { ProfessionalHangoutSchema } from './schema/professional-hangout.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ProfessionalHangout', schema: ProfessionalHangoutSchema },
    ]),
  ],
  controllers: [ProfessionalHangoutController],
  providers: [ProfessionalHangoutService],
})
export class ProfessionalHangoutModule {}
