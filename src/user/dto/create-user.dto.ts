import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/category/schema/category.schema';
import {
  CareerBuisness,
  celebrityVerification,
  EducationDetails,
  EmergencyContact,
  NgoDetails,
  Partner,
  PersonalPreferences,
  SocialMedia,
} from '../schema/user.schema';

export class BasicDetailsDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  mobileNumber: string;

  @ApiProperty()
  username: string;
}

export class IntrestsDto {
  @ApiProperty()
  intrests: Category[];
}

export class CareerDto {
  @ApiProperty()
  career: CareerBuisness[];
}

export class EducationDto {
  @ApiProperty()
  education: EducationDetails[];
}

export class SocialsDto {
  @ApiProperty()
  socials: SocialMedia;
}

export class PersonalPreferencesDto {
  @ApiProperty()
  personalPreferences: PersonalPreferences[];
}

export class MyContactsDto {
  @ApiProperty()
  partner: Partner;

  @ApiProperty()
  myContacts: EmergencyContact[];
}

export class NgoDetailsDto {
  @ApiProperty()
  ngoDetails: NgoDetails[];
}

export class CelebrityVerificationDto {
  @ApiProperty()
  celebrityVerification: celebrityVerification;
}
