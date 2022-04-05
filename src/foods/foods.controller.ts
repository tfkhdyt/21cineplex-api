import { Controller, Get, Param } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import FoodCategory from './entities/food-category.entity'
import { FoodsService } from './foods.service'

@ApiTags('foods')
@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @ApiOkResponse({
    description: 'Retrieve all foods data that available on a theater',
    type: FoodCategory,
  })
  @ApiNotFoundResponse({
    description: 'Foods not found',
  })
  @ApiBadRequestResponse({
    description: 'theater_id is not valid',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get(':theater_id')
  findAll(@Param('theater_id') theaterId: string) {
    return this.foodsService.findAll(theaterId)
  }
}
