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
export class CasualHangout {
  @Prop()
  userID: string;

  @Prop({ default: 'casual' })
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

  @Prop()
  participationInformation: string;

  @Prop()
  bringYourOwn: string;

  @Prop()
  isApproved: boolean;

  @Prop()
  isCancelled: boolean;
}

export const CasualHangoutSchema = SchemaFactory.createForClass(CasualHangout);
