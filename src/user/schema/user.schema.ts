import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category, SubCategory } from 'src/category/schema/category.schema';

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
  @Prop({ required: false })
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

  @Prop({ required: true })
  mobileNumber: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  intrests: Category[];

  @Prop({ required: false })
  subUserData: SubUserData;
}

export const UserSchema = SchemaFactory.createForClass(User);
