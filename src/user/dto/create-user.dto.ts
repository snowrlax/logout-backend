import { Category } from 'src/category/schema/category.schema';

export class CreateUserStep1Dto {
  firstName: string;
  lastName: string;
  password: string;
  mobileNumber: string;
  username: string;
}

export class CreateUserStep2Dto {
  intrests: Category[];
}
