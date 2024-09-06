import { Module } from '@nestjs/common';
import { ProfessionalHangoutController } from './professional-hangout.controller';
import { ProfessionalHangoutService } from './professional-hangout.service';
import { ProfessionalHangoutSchema } from './schema/professional-hangout.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ProfessionalHangout', schema: ProfessionalHangoutSchema },
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [ProfessionalHangoutController],
  providers: [ProfessionalHangoutService],
})
export class ProfessionalHangoutModule {}
