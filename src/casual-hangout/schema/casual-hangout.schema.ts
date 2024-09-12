import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export class HangoutLocation {
  @Prop({ required: true })
  longitude: number;

  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  landmark: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  pincode: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  meetingPoint: string;
}

export class ParticipationCriteria {
  @Prop({ required: true })
  age: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  attendanceScore: number;

  @Prop({ required: true })
  noOfParticipants: number;

  @Prop({ required: true })
  additionalNotes: string;

  @Prop({ required: true })
  price: string;
}

export class User {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  userImage: string;

  @Prop({ required: false, default: false })
  markArrived: boolean;
}

@Schema({ timestamps: true })
export class CasualHangout {
  @Prop({ required: true })
  hostId: string;

  @Prop({ required: true, default: 'casual' })
  hangoutType: string;

  @Prop({ required: true })
  hangoutTitle: string;

  @Prop({ required: true })
  hangoutDescription: string;

  @Prop({ required: true })
  hangoutImages: string[];

  @Prop({ required: true })
  hangoutCategory: string;

  @Prop({ required: true })
  hangoutSubCategory: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  startTime: string;

  @Prop({ required: true })
  endTime: string;

  @Prop({ required: true })
  hangoutLocation: HangoutLocation;

  @Prop({ required: false })
  participationCriteria: ParticipationCriteria;

  @Prop({ required: false })
  isApproved: boolean;

  @Prop({ required: false, default: false })
  isCancelled: boolean;

  @Prop({ required: false })
  requestedUsers: User[];

  @Prop({ required: true })
  approvedUsers: User[];

  @Prop({ required: true })
  paidUsers: User[];
}

export const CasualHangoutSchema = SchemaFactory.createForClass(CasualHangout);
