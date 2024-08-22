import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDto {
  @ApiProperty()
  question: string;

  @ApiProperty()
  answer: string;
}
