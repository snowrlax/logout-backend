import { Prop, Schema } from '@nestjs/mongoose';

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
  gender: string;

  @Prop()
  attendanceScore: number;

  @Prop()
  noOfParticipants: number;

  @Prop()
  additionalNotes: string;
}

@Schema({
  timestamps: true,
})
export class Hangout {
  @Prop()
  userID: string;

  @Prop()
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
  location: HangoutLocation;

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
}
