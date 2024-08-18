import { Injectable } from '@nestjs/common';
import { CreateUserStep1Dto, CreateUserStep2Dto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import mongoose from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private categoryModel: mongoose.Model<User>,
  ) {}

  async createStep1(createUserDto: CreateUserStep1Dto) {
    const createdUser = new this.categoryModel(createUserDto);
    return createdUser.save();
  }

  async createStep2(userId: string, createUserDto: CreateUserStep2Dto) {
    // check if user exists
    const userExists = await this.categoryModel.exists({ _id: userId });
    if (!userExists) {
      throw new Error('User not found');
    }

    // check if user already has same intrests and subintrests, if so then filter out only new intrests
    // get the user intrests and append the new intrests
    const user = await this.categoryModel.findById(userId).exec();
    user.intrests.push(...createUserDto.intrests);
    return user.save();
  }

  async findAll() {
    return this.categoryModel.find().exec();
  }

  async findOne(id: number) {
    return this.categoryModel.findById(id).exec();
  }

  async updateStep1(id: string, updateUserDto: CreateUserStep1Dto) {
    return this.categoryModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async updateStep2(id: string, updateUserDto: CreateUserStep2Dto) {
    return this.categoryModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async remove(id: number) {
    return this.categoryModel.deleteOne({ _id: id }).exec();
  }
}
