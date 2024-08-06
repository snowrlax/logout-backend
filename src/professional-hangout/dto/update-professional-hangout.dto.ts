import { PartialType } from '@nestjs/mapped-types';
import { CreateProfessionalHangoutDto } from './create-professional-hangout.dto';

export class UpdateProfessionalHangoutDto extends PartialType(CreateProfessionalHangoutDto) {}
