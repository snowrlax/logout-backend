import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export class UserReview {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  review: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  hangoutCategory: string;
}

@Schema({ timestamps: true })
export class Review {
  @Prop()
  userId: string;

  @Prop()
  overAllRatingAsParticipant: number;

  @Prop()
  overAllRatingAsHost: number;

  @Prop()
  participantReview: UserReview[];

  @Prop()
  hostReview: UserReview[];
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
