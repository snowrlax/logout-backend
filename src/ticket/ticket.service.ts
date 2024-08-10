import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Ticket } from './schema/ticket.schema';
import mongoose from 'mongoose';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name)
    private categoryModel: mongoose.Model<Ticket>,
  ) { }

  create(createTicket: CreateTicketDto) {
    const newTicket = new this.categoryModel(createTicket);
    return newTicket.save();
  }

  findAll() {
    return this.categoryModel.find()
  }

  findOne(id: string) {
    const ticket = this.categoryModel.findById(id).exec();
    if (!ticket) {
      return 'Ticket not found';
    }
    return ticket;
  }

  update(id: string, updateTicketDto: CreateTicketDto) {
    const ticket = this.categoryModel.findById(id).exec();
    if (!ticket) {
      return 'Ticket not found';
    }
    return this.categoryModel.findByIdAndUpdate(id, updateTicketDto, { new: true });
  }

  remove(id: string) {
    return this.categoryModel.findByIdAndDelete(id);
  }
}

