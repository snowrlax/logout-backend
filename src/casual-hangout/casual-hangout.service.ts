import { Injectable } from '@nestjs/common';
import { CreateCasualHangoutDto } from './dto/create-casual-hangout.dto';
import { UpdateCasualHangoutDto } from './dto/update-casual-hangout.dto';

@Injectable()
export class CasualHangoutService {
  create(createCasualHangoutDto: CreateCasualHangoutDto) {
    return 'This action adds a new casualHangout';
  }

  findAll() {
    return `This action returns all casualHangout`;
  }

  findOne(id: number) {
    return `This action returns a #${id} casualHangout`;
  }

  update(id: number, updateCasualHangoutDto: UpdateCasualHangoutDto) {
    return `This action updates a #${id} casualHangout`;
  }

  remove(id: number) {
    return `This action removes a #${id} casualHangout`;
  }
}
