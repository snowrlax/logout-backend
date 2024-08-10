import { SubCategory } from "../schema/category.schema"

export class CreateCategoryDto {
    categoryName: string
    subCategories: SubCategory[]
}
