import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { load } from 'cheerio'

import FoodCategory from './entities/food-category.entity'
import { AxiosService } from 'src/axios/axios.service'
import Food from './entities/food.entity'

@Injectable()
export class FoodsService {
  private readonly foodsUrl = 'gui.fnb_product.php?sid='

  constructor(private readonly axiosService: AxiosService) {}

  findAll(theaterId: string) {
    return this.scrapeFoods(theaterId)
  }

  private async scrapeFoods(theaterId: string) {
    const { data: html } = await this.axiosService.request
      .get(`${this.foodsUrl}&cinema_id=${theaterId}`)
      .catch((err) => {
        throw new BadRequestException(err.message)
      })

    const $ = load(html)

    const foodCategory: FoodCategory = {
      Promo: [],
      Paket: [],
      Popcorn: [],
      Fritters: [],
      LightMeal: [],
      Bakery: [],
      'Snack-Candy': [],
      Drinks: [],
    }

    for (const category of Object.keys(foodCategory)) {
      // console.log(category)

      $(
        `#${category} > .list-group > li > .list-group > li.list-group-item > .row`,
      ).each((_, el) => {
        const food: Food = {
          name: null,
          description: null,
          price: null,
          pictureUrl: null,
        }

        food.name = $(el).find('.col-sm-7').children().first().text()
        food.description = $(el).find('.col-sm-7 > div').text()
        food.price = $(el).find('.col-sm-2').text()
        food.pictureUrl = $(el)
          .parent()
          .parent()
          .parent()
          .find('a > img')
          .attr('src')

        foodCategory[category].push(food)
        // console.log(idx + 1, pretty($(el).html()))
      })
    }

    const allEmpty = Object.keys(foodCategory).every(function (key) {
      return foodCategory[key].length === 0
    })

    if (allEmpty) throw new NotFoundException()

    return foodCategory

    // console.log(pretty($('.main-content').html()))
  }
}
