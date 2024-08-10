import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true,
})

export class Faq {

    @Prop({ required: true })
    question: string;

    @Prop({ required: true })
    answer: string;
}


export const FaqSchema = SchemaFactory.createForClass(Faq);