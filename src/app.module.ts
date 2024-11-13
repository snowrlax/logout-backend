import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CasualHangoutModule } from './casual-hangout/casual-hangout.module';
import { CategoryModule } from './category/category.module';
import { FaqModule } from './faq/faq.module';
import { HangoutsModule } from './hangouts/hangouts.module';
import { ProfessionalHangoutModule } from './professional-hangout/professional-hangout.module';
import { ReviewModule } from './review/review.module';
import { TicketModule } from './ticket/ticket.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    CasualHangoutModule,
    ProfessionalHangoutModule,
    CategoryModule,
    FaqModule,
    TicketModule,
    UserModule,
    ReviewModule,
    HangoutsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log('AppModule constructor');
  }
}
