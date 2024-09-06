import { CasualHangout } from './casual-hangout/schema/casual-hangout.schema';
import { ProfessionalHangout } from './professional-hangout/schema/professional-hangout.schema';

export type CustomError = {
  message: string;
  statusCode: number;
};

export type UserLogin = {
  access_token: string;
};

export type MyHangouts = {
  casualHangouts: CasualHangout[];
  professionalHangouts: ProfessionalHangout[];
};
