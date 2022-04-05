import { ApiProperty } from '@nestjs/swagger'
import Food from './food.entity'

export default class FoodCategory {
  @ApiProperty()
  Promo: Food[]
  Paket: Food[]
  Popcorn: Food[]
  Fritters: Food[]
  LightMeal: Food[]
  Bakery: Food[]
  'Snack-Candy': Food[]
  Drinks: Food[]
}
