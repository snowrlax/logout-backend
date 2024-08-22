import { ApiProperty } from '@nestjs/swagger';
import {
  HangoutLocation,
  ParticipationCriteria,
} from '../schema/professional-hangout.schema';

export class CreateProfessionalHangoutStep1Dto {
  @ApiProperty()
  userID: string;

  @ApiProperty()
  hangoutType: string;

  @ApiProperty()
  hangoutCategory: string;

  @ApiProperty()
  hangoutSubCategory: string;

  @ApiProperty()
  hangoutTitle: string;

  @ApiProperty()
  hangoutDescription: string;

  @ApiProperty()
  hangoutImages: string[];

  @ApiProperty()
  date: string;

  @ApiProperty()
  startTime: string;

  @ApiProperty()
  endTime: string;

  @ApiProperty()
  hangoutLocation: HangoutLocation;
}

export class CreateProfessionalHangoutStep2Dto {
  @ApiProperty()
  participationCriteria: ParticipationCriteria;

  @ApiProperty()
  individual: boolean;

  @ApiProperty()
  couple: boolean;

  @ApiProperty()
  anyone: boolean;

  @ApiProperty()
  individualSeats: number;

  @ApiProperty()
  coupleSeats: number;

  @ApiProperty()
  participationInformation: string;

  @ApiProperty()
  bringYourOwn: string;

  @ApiProperty()
  individualPrice: number;

  @ApiProperty()
  couplePrice: number;

  @ApiProperty()
  isApproved: boolean;

  @ApiProperty()
  isCancelled: boolean;
}
