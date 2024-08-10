import { Injectable } from '@nestjs/common';
import { CreateCasualHangoutStep1Dto, CreateCasualHangoutStep2Dto } from './dto/create-casual-hangout.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CasualHangout } from './schema/casual-hangout.schema';
import mongoose from 'mongoose';

@Injectable()
export class CasualHangoutService {
  constructor(
    @InjectModel(CasualHangout.name)
    private casualHangoutModel: mongoose.Model<CasualHangout>,
  ) { }

  createStep1(createCasualHangoutDto: CreateCasualHangoutStep1Dto) {
    const newCasualHangout = new this.casualHangoutModel(createCasualHangoutDto);
    return newCasualHangout.save();
  }

  createStep2(createCasualHangoutDto: CreateCasualHangoutStep2Dto) {
    const newCasualHangout = new this.casualHangoutModel(createCasualHangoutDto);
    return newCasualHangout.save();
  }

  findAll() {
    const casualHangout = this.casualHangoutModel.find().exec();
    if (!casualHangout) {
      return 'Casual Hangout not found';
    }
    return casualHangout;
  }

  findOne(id: string) {

    const casualHangout = this.casualHangoutModel.findById(id).exec();
    if (!casualHangout) {
      return 'Casual Hangout not found';
    }
    return casualHangout;
  }

  updateStep1(id: string, updateCasualHangoutDto: CreateCasualHangoutStep1Dto) {
    const casualHangout = this.casualHangoutModel.findById(id).exec();
    if (!casualHangout) {
      return 'Casual Hangout not found';
    }
    return this.casualHangoutModel.findByIdAndUpdate(id, updateCasualHangoutDto, { new: true });
  }

  updateStep2(id: string, updateCasualHangoutDto: CreateCasualHangoutStep2Dto) {
    const casualHangout = this.casualHangoutModel.findById(id).exec();
    if (!casualHangout) {
      return 'Casual Hangout not found';
    }
    return this.casualHangoutModel.findByIdAndUpdate(id, updateCasualHangoutDto, { new: true });
  }

  remove(id: string) {
    return this.casualHangoutModel.findByIdAndDelete(id);
  }
}
