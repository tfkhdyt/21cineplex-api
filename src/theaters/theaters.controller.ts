import {
  BadRequestException,
  Controller,
  Get,
  Param,
  // ParseIntPipe,
  Query,
} from '@nestjs/common'
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger'

import TheaterDetail from './entities/theater-detail.entity'
import TheaterType from './entities/theater-type.entity'
import { TheatersService } from './theaters.service'
import CityId from './dto/city-id.dto'

@ApiTags('theaters')
@Controller('theaters')
export class TheatersController {
  constructor(private readonly theatersService: TheatersService) {}

  @ApiOkResponse({
    description: 'Retrieve all theaters by city_id',
    type: TheaterType,
  })
  @ApiNotFoundResponse({
    description: 'Theaters not found',
  })
  @ApiBadGatewayResponse({
    description: 'Bad gateway',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiQuery({
    name: 'city_id',
    type: CityId,
  })
  @Get()
  getTheatersByCityId(@Query('city_id') cityId = 10) {
    if (!Number(cityId))
      throw new BadRequestException('city_id should be number')
    return this.theatersService.getTheaters(cityId)
  }

  @ApiOkResponse({
    description: 'Retrieve a theater by city_id and theater_id',
    type: TheaterDetail,
  })
  @ApiBadRequestResponse({
    description: 'city_id is not valid',
  })
  @ApiNotFoundResponse({
    description: 'Theater not found',
  })
  @ApiBadGatewayResponse({
    description: 'Bad gateway',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiQuery({
    name: 'city_id',
    type: CityId,
  })
  @Get(':theater_id')
  getTheaterByTheaterId(
    @Param('theater_id') theaterId: string,
    @Query('city_id') cityId = 10,
  ) {
    if (!Number(cityId))
      throw new BadRequestException('city_id should be number')
    return this.theatersService.getTheaterByTheaterId(theaterId, cityId)
  }
}
