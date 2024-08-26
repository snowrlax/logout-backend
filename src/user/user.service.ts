import { Injectable } from '@nestjs/common';
import {
  BasicDetailsDto,
  CareerDto,
  CelebrityVerificationDto,
  EducationDto,
  IntrestsDto,
  MyContactsDto,
  NgoDetailsDto,
  PersonalPreferencesDto,
  SocialsDto,
} from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import mongoose from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async basicDetails(createUserDto: BasicDetailsDto) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async intrests(userId: string, createUserDto: IntrestsDto) {
    // check if user exists
    const userExists = await this.userModel.exists({ _id: userId });
    if (!userExists) {
      throw new Error('User not found');
    }

    // check if user already has same intrests and subintrests, if so then filter out only new intrests
    // get the user intrests and append the new intrests
    const user = await this.userModel.findById(userId).exec();
    user.intrests.push(...createUserDto.intrests);
    return user.save();
  }

  async career(userId: string, careerDto: CareerDto) {
    const userExists = await this.userModel.exists({ _id: userId });

    if (!userExists) {
      throw new Error('User not found');
    }

    const user = await this.userModel.findByIdAndUpdate(userId, careerDto, {
      new: true,
    });

    return user;
  }

  async education(userId: string, educationDto: EducationDto) {
    const userExists = await this.userModel.exists({ _id: userId });

    if (!userExists) {
      throw new Error('User not found');
    }

    const user = await this.userModel.findByIdAndUpdate(userId, educationDto, {
      new: true,
    });
  }

  async socials(userId: string, socialsDto: SocialsDto) {
    const userExists = await this.userModel.exists({ _id: userId });

    if (!userExists) {
      throw new Error('User not found');
    }

    const user = await this.userModel.findByIdAndUpdate(userId, socialsDto, {
      new: true,
    });

    return user;
  }

  async myContacts(userId: string, createUserDto: MyContactsDto) {
    const userExists = await this.userModel.exists({ _id: userId });

    if (!userExists) {
      throw new Error('User not found');
    }

    const user = await this.userModel
      .findByIdAndUpdate(userId, createUserDto, {
        new: true,
      })
      .exec();

    return user;
  }

  async preferences(userId: string, createUserDto: PersonalPreferencesDto) {
    const userExists = await this.userModel.exists({ _id: userId });

    if (!userExists) {
      throw new Error('User not found');
    }

    const user = await this.userModel
      .findByIdAndUpdate(userId, createUserDto, {
        new: true,
      })
      .exec();

    return user;
  }

  async ngoDetails(userId: string, createUserDto: NgoDetailsDto) {
    const userExists = await this.userModel.exists({ _id: userId });

    if (!userExists) {
      throw new Error('User not found');
    }

    const user = await this.userModel
      .findByIdAndUpdate(userId, createUserDto, {
        new: true,
      })
      .exec();

    return user;
  }

  async celebrity(userId: string, createUserDto: CelebrityVerificationDto) {
    const userExists = await this.userModel.exists({ _id: userId });

    if (!userExists) {
      throw new Error('User not found');
    }

    const user = await this.userModel
      .findByIdAndUpdate(userId, createUserDto, {
        new: true,
      })
      .exec();

    return user;
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: number) {
    return this.userModel.findById(id).exec();
  }

  async updateBasicDetails(id: string, updateUserDto: BasicDetailsDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async updateIntrests(id: string, updateUserDto: IntrestsDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async remove(id: number) {
    return this.userModel.deleteOne({ _id: id }).exec();
  }
}
