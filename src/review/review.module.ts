import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ReviewSchema } from './schema/review.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/schema/user.schema';
import { CasualHangoutSchema } from 'src/casual-hangout/schema/casual-hangout.schema';
import { ProfessionalHangoutSchema } from 'src/professional-hangout/schema/professional-hangout.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Review', schema: ReviewSchema },
      { name: 'User', schema: UserSchema },
      { name: 'CasualHangout', schema: CasualHangoutSchema },
      { name: 'ProfessionalHangout', schema: ProfessionalHangoutSchema },
    ]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
