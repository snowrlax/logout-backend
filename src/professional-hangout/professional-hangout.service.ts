import { Injectable } from '@nestjs/common';
import { CreateProfessionalHangoutStep1Dto, CreateProfessionalHangoutStep2Dto } from './dto/create-professional-hangout.dto';
import { ProfessionalHangout } from './schema/professional-hangout.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProfessionalHangoutService {
  constructor(
    @InjectModel(ProfessionalHangout.name)
    private casualHangoutModel: mongoose.Model<ProfessionalHangout>,
  ) { }

  createStep1(createProfessionalHangoutDto: CreateProfessionalHangoutStep1Dto) {

    const newProfessionalHangout = new this.casualHangoutModel(createProfessionalHangoutDto);
    return newProfessionalHangout.save();
  }

  createStep2(createProfessionalHangoutDto: CreateProfessionalHangoutStep2Dto) {
      
      const newProfessionalHangout = new this.casualHangoutModel(createProfessionalHangoutDto);
      return newProfessionalHangout.save();
  }

  findAll() {
    const professionalHangout = this.casualHangoutModel.find().exec();
    if (!professionalHangout) {
      return 'Professional Hangout not found';
    }
    return professionalHangout;
  }

  findOne(id: string) {
      
      const professionalHangout = this.casualHangoutModel.findById(id).exec();
      if (!professionalHangout) {
        return 'Professional Hangout not found';
      }
      return professionalHangout;
  }

  updateStep1(id: string, updateProfessionalHangoutDto: CreateProfessionalHangoutStep1Dto) {
        
        const professionalHangout = this.casualHangoutModel.findById(id).exec();
        if (!professionalHangout) {
          return 'Professional Hangout not found';
        }
        return this.casualHangoutModel.findByIdAndUpdate(id, updateProfessionalHangoutDto, { new: true });
  }

  updateStep2(id: number, updateProfessionalHangoutDto: CreateProfessionalHangoutStep2Dto) {
          
          const professionalHangout = this.casualHangoutModel.findById(id).exec();
          if (!professionalHangout) {
            return 'Professional Hangout not found';
          }
          return this.casualHangoutModel.findByIdAndUpdate(id, updateProfessionalHangoutDto, { new: true });
  }

  remove(id: number) {
    return this.casualHangoutModel.findByIdAndDelete(id);
  }
}
