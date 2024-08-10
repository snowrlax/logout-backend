import { Injectable } from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Faq } from './schema/faq.schema';
import mongoose from 'mongoose';

@Injectable()
export class FaqService {
  constructor(
    @InjectModel(Faq.name)
    private categoryModel: mongoose.Model<Faq>,
  ) { }

  create(createFaq: CreateFaqDto) {
    const newFaq = new this.categoryModel(createFaq);
    return newFaq.save();
  }

  findAll() {
    return this.categoryModel.find()
  }

  findOne(id: string) {
    const faq = this.categoryModel.findById(id).exec();
    if (!faq) {
      return 'Faq not found';
    }
    return faq;
  }

  update(id: string, updateFaqDto: CreateFaqDto) {
    const faq = this.categoryModel.findById(id).exec();
    if (!faq) {
      return 'Faq not found';
    }
    return this.categoryModel.findByIdAndUpdate(id, updateFaqDto, { new: true });
  }

  remove(id: string) {
    return this.categoryModel.findByIdAndDelete(id);
  }
}

