import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/category/schema/category.schema';

export class CreateUserStep1Dto {
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

export class CreateUserStep2Dto {
  @ApiProperty()
  intrests: Category[];
}
