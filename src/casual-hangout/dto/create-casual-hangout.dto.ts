import { ApiProperty } from '@nestjs/swagger';
import {
  HangoutLocation,
  ParticipationCriteria,
  User,
} from '../schema/casual-hangout.schema';

export class CreateCasualHangoutStep1Dto {
  @ApiProperty()
  hostId: string;

  @ApiProperty()
  hangoutType: string;

  @ApiProperty()
  hangoutTitle: string;

  @ApiProperty()
  hangoutDescription: string;

  @ApiProperty()
  hangoutImages: string[];

  @ApiProperty()
  hangoutCategory: string;

  @ApiProperty()
  hangoutSubCategory: string;

  @ApiProperty()
  date: string;

  @ApiProperty()
  startTime: string;

  @ApiProperty()
  endTime: string;

  @ApiProperty()
  hangoutLocation: HangoutLocation;
}

export class CreateCasualHangoutStep2Dto {
  @ApiProperty()
  participationCriteria: ParticipationCriteria;

  @ApiProperty()
  isApproved: boolean = false;

  @ApiProperty()
  isCancelled: boolean = false;

  @ApiProperty()
  requestedUsers: User[];

  @ApiProperty()
  approvedUsers: User[];
}
