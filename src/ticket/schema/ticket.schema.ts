import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Ticket {
  @Prop({ required: false })
  userId: string;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  question: string;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
