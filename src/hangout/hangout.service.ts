import { Injectable } from '@nestjs/common';
import { CreateHangoutDto } from './dto/create-hangout.dto';
import { UpdateHangoutDto } from './dto/update-hangout.dto';

@Injectable()
export class HangoutService {
  create(createHangoutDto: CreateHangoutDto) {
    return 'This action adds a new hangout';
  }

  findAll() {
    return `This action returns all hangout`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hangout`;
  }

  update(id: number, updateHangoutDto: UpdateHangoutDto) {
    return `This action updates a #${id} hangout`;
  }

  remove(id: number) {
    return `This action removes a #${id} hangout`;
  }
}
