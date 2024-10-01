import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category, SubCategory } from 'src/category/schema/category.schema';

export class Partner {
  @Prop({ required: true, unique: true })
  userName: string;

  @Prop({ required: true })
  userRelation: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  isAccepted: boolean = false;

  @Prop({ required: true })
  userImage: string;

  @Prop({ required: true, unique: true })
  mobileNumber: string;
}

export class EmergencyContact {
  @Prop({ required: true })
  contactName: string;

  @Prop({ required: true })
  contactNumber: string;

  @Prop({ required: true })
  relation: string;
}

export class SocialMedia {
  @Prop({ required: true, unique: true, default: '' })
  facebook: string;

  @Prop({ required: true, default: false })
  facebookIsVerified: boolean = false;

  @Prop({ required: true, unique: true, default: '' })
  instagram: string;

  @Prop({ required: true, default: false })
  instagramIsVerified: boolean = false;

  @Prop({ required: true, unique: true, default: '' })
  twitter: string;

  @Prop({ required: true, default: false })
  twitterIsVerified: boolean = false;

  @Prop({ required: true, unique: true, default: '' })
  snapchat: string;

  @Prop({ required: true, default: false })
  snapchatIsVerified: boolean = false;

  @Prop({ required: true, unique: true, default: '' })
  youtube: string;

  @Prop({ required: true, default: false })
  youtubeIsVerified: boolean = false;
}

export class NgoDetails {
  @Prop({ required: true })
  ngoName: string;

  @Prop({ required: true })
  ngoDesignation: string;
}

export class EducationDetails {
  @Prop({ required: true })
  schoolName: string;

  @Prop({ required: true })
  collegeName: string;

  @Prop({ required: true })
  collegeDegree: string;

  @Prop({ required: true })
  collegeYear: string;

  @Prop({ required: true })
  competitiveExams: string[];
}

export class PersonalPreferences {
  @Prop({ required: true })
  religion: string;

  @Prop({ required: true })
  politicalPreference: string;

  @Prop({ required: true })
  sunSign: string;

  @Prop({ required: true })
  dietPreference: string;

  @Prop({ required: true })
  height: number;

  @Prop({ required: true })
  weight: number;

  @Prop({ required: true })
  smoking: string;

  @Prop({ required: true })
  drinking: string;

  @Prop({ required: true })
  languageSpoken: string[];
}

export class celebrityVerification {
  @Prop({ required: true })
  instagram: number;

  @Prop({ required: true })
  youtube: number;
}

export class BankDetails {
  @Prop({ required: true })
  bankName: string;

  @Prop({ required: true })
  accountNumber: string;

  @Prop({ required: true })
  accountName: string;

  @Prop({ required: true })
  ifscCode: string;

  @Prop({ required: true })
  isVerified: boolean = false;

  @Prop({ required: true })
  termAcceptance: boolean = false;
}

export class CareerBuisness {
  @Prop({ required: true })
  occupation: string;

  @Prop({ required: true })
  companyName: string;

  @Prop({ required: true })
  companyType: string;

  @Prop({ required: true })
  designation: string;

  @Prop({ required: true })
  startDate: string;

  @Prop({ required: true })
  endDate: string;
}

export class DocumentDetails {
  @Prop({ required: true })
  aadharCardFront: string;

  @Prop({ required: true })
  aadharCardBack: string;

  @Prop({ required: true })
  passportCardFront: string;

  @Prop({ required: true })
  passportCardBack: string;

  @Prop({ required: true })
  isAadharVerified: boolean = false;

  @Prop({ required: true })
  isPassportVerified: boolean = false;

  @Prop({ required: true })
  superAdminId: string;

  @Prop({ required: true })
  superAdminNotes: string;
}

export class UserAddress {
  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  landmark: string;

  @Prop({ required: true })
  streetName: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  zipCode: string;
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

  @Prop({ required: false })
  userEmail: string;

  @Prop({ required: false })
  userImage: string;

  @Prop({ required: false })
  userGender: string;

  @Prop({ required: false })
  userDOB: string;

  @Prop({ required: false })
  userAddress: UserAddress;

  @Prop({ required: true, default: [] })
  myFriends: string[];

  @Prop({ required: true, default: [] })
  requests: string[];

  @Prop({ required: true, default: [] })
  sentRequests: string[];

  @Prop({ required: true, default: [] })
  requestedHangouts: string[];

  @Prop({ required: true, default: [] })
  acceptedHangouts: string[];

  @Prop({ required: true, default: [] })
  paidHangouts: string[];

  @Prop({ required: false })
  documents: DocumentDetails;

  @Prop({ required: false, type: CareerBuisness })
  career: CareerBuisness;

  @Prop({ required: false })
  bankDetails: BankDetails;

  @Prop({ required: false })
  celebrityVerification: celebrityVerification;

  @Prop({ required: false })
  personalPreferences: PersonalPreferences;

  @Prop({ required: true, type: [Category], default: [] })
  intrests: Category[];

  @Prop({ required: false })
  education: EducationDetails;

  @Prop({ required: false })
  socials: SocialMedia;

  @Prop({ required: false })
  myContacts: Partner;

  @Prop({ required: false })
  emergencyContacts: EmergencyContact;

  @Prop({ required: false })
  ngoDetails: NgoDetails;

  @Prop({ required: false })
  superAdminId: string;

  @Prop({ required: false })
  superAdminNotes: string;

  @Prop({ required: false })
  createdHangouts: string[];

  @Prop({ required: false })
  joinedHangouts: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
