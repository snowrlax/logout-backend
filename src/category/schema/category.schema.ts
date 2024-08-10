import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export class SubCategory {
    @Prop({ required: true })
    id: string;

    @Prop({ required: true })
    name: string;
}

@Schema({
    timestamps: true,
})

export class Category {

    @Prop({ required: true })
    categoryName: string;

    @Prop({ required: true })
    subCategories: SubCategory[];
}


export const CategorySchema = SchemaFactory.createForClass(Category);