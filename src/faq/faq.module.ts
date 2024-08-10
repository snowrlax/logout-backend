import { Module } from '@nestjs/common';
import { FaqService } from './faq.service';
import { FaqController } from './faq.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FaqSchema } from './schema/faq.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Faq', schema: FaqSchema },
    ]),
  ],
  controllers: [FaqController],
  providers: [FaqService],
})
export class FaqModule {}
