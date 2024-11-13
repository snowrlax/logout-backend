import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { SubCategory } from './schema/category.schema';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategory: CreateCategoryDto) {
    return this.categoryService.create(createCategory);
  }

  @Patch('/addSubCategory/:id')
  addSubCategory(@Param('id') id: string, @Body() subCategory: SubCategory) {
    console.log(subCategory);
    return this.categoryService.addSubCategory(id, subCategory);
  }

  @Get()
  findAll() {
    console.log('find all');
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: CreateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }

  @Patch('/deleteSubCategory/:categoryId')
  deleteSubCategory(
    @Param('categoryId') categoryId: string,
    @Body() subCategory: SubCategory,
  ) {
    return this.categoryService.deleteSubCategory(categoryId, subCategory);
  }

  @Patch('/updateSubCategory/:categoryId')
  updateSubCategory(
    @Param('categoryId') categoryId: string,
    @Body() subCategory: SubCategory,
  ) {
    return this.categoryService.updateSubCategory(categoryId, subCategory);
  }
}
