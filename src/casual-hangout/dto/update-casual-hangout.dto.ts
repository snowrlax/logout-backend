import { PartialType } from '@nestjs/mapped-types';
import { CreateCasualHangoutDto } from './create-casual-hangout.dto';

export class UpdateCasualHangoutDto extends PartialType(CreateCasualHangoutDto) {}
