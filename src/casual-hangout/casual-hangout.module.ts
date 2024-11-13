import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/schema/user.schema';
import { CasualHangoutController } from './casual-hangout.controller';
import { CasualHangoutService } from './casual-hangout.service';
import { CasualHangoutSchema } from './schema/casual-hangout.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CasualHangout', schema: CasualHangoutSchema },
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [CasualHangoutController],
  providers: [CasualHangoutService],
})
export class CasualHangoutModule {}
