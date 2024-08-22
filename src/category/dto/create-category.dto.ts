import { ApiProperty } from '@nestjs/swagger';
import { SubCategory } from '../schema/category.schema';

export class CreateCategoryDto {
  @ApiProperty()
  categoryName: string;

  @ApiProperty()
  subCategories: SubCategory[];
}
