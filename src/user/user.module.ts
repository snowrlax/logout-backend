import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { CasualHangoutSchema } from 'src/casual-hangout/schema/casual-hangout.schema';
import { ProfessionalHangoutSchema } from 'src/professional-hangout/schema/professional-hangout.schema';
// import { UserMiddleware } from './user.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      {
        name: 'CasualHangout',
        schema: CasualHangoutSchema,
      },
      {
        name: 'ProfessionalHangout',
        schema: ProfessionalHangoutSchema,
      },
    ]),
    // JwtModule.register({ secret: 'hard!to-guess_secret' }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
  // configure(user: MiddlewareConsumer) {
  //   user
  //     .apply(UserMiddleware)
  //     // .exclude({ path: 'user/login', method: RequestMethod.POST })
  //     .forRoutes({ path: 'user/*', method: RequestMethod.PATCH });
  // }
}
