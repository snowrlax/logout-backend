import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category, SubCategory } from './schema/category.schema';
import mongoose from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: mongoose.Model<Category>,
  ) { }

  async create(createCategory: CreateCategoryDto) {
    const newCategory = new this.categoryModel(createCategory);
    return newCategory.save();
  }

  async addSubCategory(id: string, subCategory: SubCategory) {
    // find the category
    // append
    const sub = subCategory.name;
    const category = await this.categoryModel.findById(id).exec();

    if (!category) {
      return 'Category not found';
    }
  
    // save the subCategory if it doesn't exist
    if (!category.subCategories.find((subCat) => subCat.name === sub)) {
      category.subCategories.push(subCategory);
      return category.save();
    }
    return 'Sub Category already exists';
  }

  findAll() {
    return this.categoryModel.find()
  }

  findOne(id: string) {
    const category = this.categoryModel.findById(id).exec();
    if (!category) {
      return 'Category not found';
    }
    return category;
  }

  update(id: string, updateCategory: CreateCategoryDto) {
    const category = this.categoryModel.findById(id).exec();
    if (!category) {
      return 'Category not found';
    }
    return this.categoryModel.findByIdAndUpdate(id, updateCategory, { new: true });
  }

  remove(id: string) {
    return this.categoryModel.findByIdAndDelete(id);
  }

  async deleteSubCategory(categoryId: string, subCategory: SubCategory) {
    const category = await this.categoryModel.findById(categoryId).exec();
    if (!category) {
      return 'Category not found';
    }
    category.subCategories = category.subCategories.filter((sub) => sub.name !== subCategory.name);
    return category.save();
  }

  async updateSubCategory(categoryId: string, subCategory: SubCategory) {
    const category = await this.categoryModel.findById(categoryId).exec();
    if (!category) {
      return 'Category not found';
    }

    const subCategoryById = category.subCategories.find((sub) => sub.id === subCategory.id);
    if (!subCategoryById) {
      return 'Sub Category not found';
    }

    subCategoryById.name = subCategory.name;
    return category.save();
  }
}
