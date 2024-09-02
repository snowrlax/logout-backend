import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  BasicDetailsDto,
  CareerDto,
  CelebrityVerificationDto,
  EducationDto,
  IntrestsDto,
  LoginUserDto,
  LoginUserOtpDto,
  MyContactsDto,
  NgoDetailsDto,
  PersonalPreferencesDto,
  SocialsDto,
} from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import mongoose from 'mongoose';
import { CustomError, UserLogin } from 'src/types';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) {}

  async loginWithPhonePass(
    loginUserDto: LoginUserDto,
  ): Promise<UserLogin | CustomError> {
    try {
      // use bcrypt here to match the hashed password
      const user = await this.userModel.findOne({
        mobileNumber: loginUserDto.mobileNumber,
      });

      const isMatch = await bcrypt.compare(
        loginUserDto.password,
        user.password,
      );

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (isMatch) {
        throw new UnauthorizedException();
      }

      const payload = { sub: user._id, username: user.username };

      return {
        access_token: await this.jwtService.signAsync(payload, {
          secret: process.env.JWT_SECRET || 'mysupersecret',
          expiresIn: '1d',
        }),
      };
    } catch (e) {
      return { message: e.message, statusCode: e.response.statusCode };
    }
  }

  async loginWithPhoneOtp(loginUserDto: LoginUserOtpDto) {
    try {
      const user = await this.userModel.findOne({
        mobileNumber: loginUserDto.mobileNumber,
      });

      const STATIC_OTP = 4444;

      console.log(loginUserDto);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (loginUserDto.otp !== STATIC_OTP) {
        throw new UnauthorizedException();
      }

      const payload = { sub: user._id, username: user.username };

      return {
        access_token: await this.jwtService.signAsync(payload, {
          secret: process.env.JWT_SECRET || 'mysupersecret',
          expiresIn: '1d',
        }),
      };
    } catch (e) {
      return { message: e.message, statusCode: e.response.statusCode };
    }
  }

  async basicDetails(
    createUserDto: BasicDetailsDto,
  ): Promise<User | CustomError> {
    try {
      const saltOrRounds = 10;
      const password = process.env.HASH_PASSWORD || 'supersecretpassword';
      const hash = await bcrypt.hash(password, saltOrRounds);

      createUserDto.password = hash;

      const createdUser = new this.userModel(createUserDto);
      return await createdUser.save();
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  async intrests(
    userId: string,
    createUserDto: IntrestsDto,
  ): Promise<User | CustomError> {
    try {
      const user = await this.userModel.findById(userId).exec();
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
      user.intrests.push(...createUserDto.intrests);
      return user.save();
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.response.statusCode };
    }
  }

  async career(
    userId: string,
    careerDto: CareerDto,
  ): Promise<User | CustomError> {
    try {
      return await this.userModel.findByIdAndUpdate(userId, careerDto, {
        new: true,
      });
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  async education(userId: string, educationDto: EducationDto) {
    try {
      return await this.userModel.findByIdAndUpdate(userId, educationDto, {
        new: true,
      });
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  async socials(userId: string, socialsDto: SocialsDto) {
    try {
      const user = await this.userModel.findById(userId).exec();
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      console.log(user.socials);
      // Merge the existing socials with the updated ones
      user.socials = {
        ...user.socials,
        ...socialsDto,
      };

      await user.save();
      return user;
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  async myContacts(userId: string, createUserDto: MyContactsDto) {
    try {
      const user = await this.userModel.findById(userId).exec();
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      // check if the partner with that id exists
      const partnerExists = this.userModel.findById(
        createUserDto.partner.userId,
      );

      if (!partnerExists) {
        throw new NotFoundException(
          `Partner with ID ${createUserDto.partner.userId} not found`,
        );
      }

      await user.save();
      return user;
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  async preferences(userId: string, createUserDto: PersonalPreferencesDto) {
    try {
      return await this.userModel.findByIdAndUpdate(userId, createUserDto, {
        new: true,
      });
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
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
