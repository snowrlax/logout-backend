import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export class HangoutLocation {
  @Prop()
  longitude: number;

  @Prop()
  latitude: number;

  @Prop()
  street: string;

  @Prop()
  landmark: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  pincode: string;

  @Prop()
  country: string;

  @Prop()
  meetingPoint: string;
}

export class ParticipationCriteria {
  @Prop()
  age: string;

  @Prop()
  participationType: string;

  @Prop()
  minimumRating: number;

  @Prop()
  gender: string;
}

@Schema({
  timestamps: true,
})

export class ProfessionalHangout {
  @Prop()
  userID: string;

  @Prop({ default: 'professional' })
  hangoutType: string;

  @Prop()
  hangoutCategory: string;

  @Prop()
  hangoutSubCategory: string;

  @Prop()
  hangoutTitle: string;

  @Prop()
  hangoutDescription: string;

  @Prop()
  hangoutImages: string[];

  @Prop()
  date: string;

  @Prop()
  startTime: string;

  @Prop()
  endTime: string;

  @Prop()
  hangoutLocation: HangoutLocation;

  @Prop()
  participationCriteria: ParticipationCriteria;

  @Prop({ default: false })
  individual: boolean;

  @Prop({ default: false })
  couple: boolean;

  @Prop({ default: false })
  anyone: boolean;

  @Prop()
  individualSeats: number;

  @Prop()
  coupleSeats: number;

  @Prop()
  participationInformation: string;

  @Prop()
  bringYourOwn: string;

  @Prop()
  individualPrice: number;

  @Prop()
  couplePrice: number;

  @Prop()
  isApproved: boolean;

  @Prop()
  isCancelled: boolean;
}

export const ProfessionalHangoutSchema = SchemaFactory.createForClass(ProfessionalHangout);
