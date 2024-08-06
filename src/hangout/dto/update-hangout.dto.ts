import { PartialType } from '@nestjs/mapped-types';
import { CreateHangoutDto } from './create-hangout.dto';

export class UpdateHangoutDto extends PartialType(CreateHangoutDto) {}
