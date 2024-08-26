import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category, SubCategory } from 'src/category/schema/category.schema';

export class Partner {
  @Prop({ required: false, unique: true })
  userName: string;

  @Prop({ required: false })
  userRelation: string;

  @Prop({ required: false })
  userId: string;

  @Prop({ required: false })
  firstName: string;

  @Prop({ required: false })
  lastName: string;

  @Prop({ required: false })
  isAccepted: boolean = false;

  @Prop({ required: false })
  userImage: string;

  @Prop({ required: false })
  mobileNumber: string;
}

export class EmergencyContact {
  @Prop({ required: false })
  contactName: string;

  @Prop({ required: false })
  contactNumber: string;

  @Prop({ required: false })
  relation: string;
}

export class SocialMedia {
  @Prop({ required: false })
  facebook: string;

  @Prop({ required: false })
  facebookIsVerified: boolean = false;

  @Prop({ required: false })
  instagram: string;

  @Prop({ required: false })
  instagramIsVerified: boolean = false;

  @Prop({ required: false })
  twitter: string;

  @Prop({ required: false })
  twitterIsVerified: boolean = false;

  @Prop({ required: false })
  snapchat: string;

  @Prop({ required: false })
  snapchatIsVerified: boolean = false;

  @Prop({ required: false })
  youtube: string;

  @Prop({ required: false })
  youtubeIsVerified: boolean = false;
}

export class NgoDetails {
  @Prop({ required: false })
  ngoName: string;

  @Prop({ required: false })
  ngoDesignation: string;
}

export class EducationDetails {
  @Prop({ required: false })
  schoolName: string;

  @Prop({ required: false })
  collegeName: string;

  @Prop({ required: false })
  collegeDegree: string;

  @Prop({ required: false })
  collegeYear: string;

  @Prop({ required: false })
  competitiveExams: string[];
}

export class PersonalPreferences {
  @Prop({ required: false })
  religion: string;

  @Prop({ required: false })
  politicalPreference: string;

  @Prop({ required: false })
  sunSign: string;

  @Prop({ required: false })
  dietPreference: string;

  @Prop({ required: false })
  height: number;

  @Prop({ required: false })
  weight: number;

  @Prop({ required: false })
  smoking: string;

  @Prop({ required: false })
  drinking: string;

  @Prop({ required: false })
  languageSpoken: string[];
}

export class celebrityVerification {
  @Prop({ required: false })
  instagram: number;

  @Prop({ required: false })
  youtube: number;
}

export class BankDetails {
  @Prop({ required: false })
  bankName: string;

  @Prop({ required: false })
  accountNumber: string;

  @Prop({ required: false })
  accountName: string;

  @Prop({ required: false })
  ifscCode: string;

  @Prop({ required: false })
  isVerified: boolean = false;

  @Prop({ required: false })
  termAcceptance: boolean = false;
}

export class CareerBuisness {
  @Prop({ required: false })
  occupation: string;

  @Prop({ required: false })
  companyName: string;

  @Prop({ required: false })
  companyType: string;

  @Prop({ required: false })
  designation: string;

  @Prop({ required: false })
  startDate: string;

  @Prop({ required: false })
  endDate: string;
}

export class DocumentDetails {
  @Prop({ required: false })
  aadharCardFront: string;

  @Prop({ required: false })
  aadharCardBack: string;

  @Prop({ required: false })
  passportCardFront: string;

  @Prop({ required: false })
  passportCardBack: string;

  @Prop({ required: false })
  isAadharVerified: boolean = false;

  @Prop({ required: false })
  isPassportVerified: boolean = false;

  @Prop({ required: false })
  superAdminId: string;

  @Prop({ required: false })
  superAdminNotes: string;
}

export class UserAddress {
  @Prop({ required: false })
  address: string;

  @Prop({ required: false })
  landmark: string;

  @Prop({ required: false })
  streetName: string;

  @Prop({ required: false })
  city: string;

  @Prop({ required: false })
  state: string;

  @Prop({ required: false })
  country: string;

  @Prop({ required: false })
  zipCode: string;
}

export class SubUserData {
  @Prop({ required: false, unique: true })
  userEmail: string;

  @Prop({ required: false })
  userImage: string;

  @Prop({ required: false })
  userAddress: UserAddress;

  @Prop({ required: false })
  userGender: string;

  @Prop({ required: false })
  userDOB: string;
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  mobileNumber: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  intrests: Category[];

  @Prop({ required: false })
  subUserData: SubUserData;
}

export const UserSchema = SchemaFactory.createForClass(User);
