import { Module } from '@nestjs/common';
import { CasualHangoutService } from './casual-hangout.service';
import { CasualHangoutController } from './casual-hangout.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CasualHangoutSchema } from './schema/casual-hangout.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CasualHangout', schema: CasualHangoutSchema },
    ]),
  ],
  controllers: [CasualHangoutController],
  providers: [CasualHangoutService],
})
export class CasualHangoutModule {}
