import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common'
import {
  ApiBadGatewayResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger'
import BaseMovie from 'src/movies/entities/base-movie.entity'
import CityId from 'src/theaters/dto/city-id.dto'
import { PlayingService } from './playing.service'

@ApiTags('playing')
@Controller('playing')
export class PlayingController {
  constructor(private readonly playingService: PlayingService) {}

  @ApiOkResponse({
    description: 'Retrieve all playing movies',
    type: BaseMovie,
    isArray: true,
  })
  @ApiBadGatewayResponse({
    description: 'Bad gateway',
  })
  @ApiNotFoundResponse({
    description: 'Movies not found',
  })
  @ApiQuery({
    name: 'city_id',
    type: CityId,
  })
  @Get()
  getPlayings(@Query('city_id') cityId = 10) {
    if (!Number(cityId))
      throw new BadRequestException('city_id should be number')
    return this.playingService.getPlayings(cityId)
  }

  @ApiOkResponse({
    description: 'Retrieve a playing movie',
    type: BaseMovie,
  })
  @ApiBadGatewayResponse({
    description: 'Bad gateway',
  })
  @ApiNotFoundResponse({
    description: 'Movies not found',
  })
  @ApiQuery({
    name: 'city_id',
    type: CityId,
  })
  @Get(':movie_id')
  getPlayingById(
    @Param('movie_id') movieId: string,
    @Query('city_id') cityId = 10,
  ) {
    if (!Number(cityId)) {
      throw new BadRequestException('city_id should be number')
    }
    return this.playingService.getPlayingById(movieId, cityId)
  }
}
