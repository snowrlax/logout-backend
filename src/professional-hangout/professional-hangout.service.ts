import { Injectable } from '@nestjs/common';
import { CreateProfessionalHangoutDto } from './dto/create-professional-hangout.dto';
import { UpdateProfessionalHangoutDto } from './dto/update-professional-hangout.dto';

@Injectable()
export class ProfessionalHangoutService {
  create(createProfessionalHangoutDto: CreateProfessionalHangoutDto) {
    return 'This action adds a new professionalHangout';
  }

  findAll() {
    return `This action returns all professionalHangout`;
  }

  findOne(id: number) {
    return `This action returns a #${id} professionalHangout`;
  }

  update(
    id: number,
    updateProfessionalHangoutDto: UpdateProfessionalHangoutDto,
  ) {
    return `This action updates a #${id} professionalHangout`;
  }

  remove(id: number) {
    return `This action removes a #${id} professionalHangout`;
  }
}
