import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import {
  ApiBadGatewayResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { CitiesService } from './cities.service'
import City from './entities/city.entity'

@ApiTags('cities')
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @ApiOkResponse({
    description: 'Retrieve all available cities',
    type: City,
    isArray: true,
  })
  @ApiBadGatewayResponse({
    description: 'Bad gateway',
  })
  @ApiNotFoundResponse({
    description: 'Cities not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get()
  getCities() {
    return this.citiesService.getCities()
  }

  @ApiOkResponse({
    description: 'Retrieve an available city by id',
    type: City,
  })
  @ApiBadGatewayResponse({
    description: 'Bad gateway',
  })
  @ApiNotFoundResponse({
    description: 'City not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get(':city_id')
  getCity(@Param('city_id', ParseIntPipe) id: number) {
    return this.citiesService.getCity(id)
  }
}
