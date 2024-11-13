import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CasualHangoutSchema } from 'src/casual-hangout/schema/casual-hangout.schema';
import { ProfessionalHangoutSchema } from 'src/professional-hangout/schema/professional-hangout.schema';
import { UserSchema } from 'src/user/schema/user.schema';
import { HangoutsService } from './hangout.service';
import { HangoutsController } from './hangouts.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CasualHangout', schema: CasualHangoutSchema },
      { name: 'ProfessionalHangout', schema: ProfessionalHangoutSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [HangoutsController],
  providers: [HangoutsService],
})
export class HangoutsModule {}
