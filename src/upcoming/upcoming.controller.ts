import { Controller, Get, Param } from '@nestjs/common'
import {
  ApiBadGatewayResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import BaseMovie from 'src/movies/entities/base-movie.entity'
import { UpcomingService } from './upcoming.service'

@ApiTags('upcoming')
@Controller('upcoming')
export class UpcomingController {
  constructor(private readonly upcomingService: UpcomingService) {}

  @ApiOkResponse({
    description: 'Retrieve all upcoming movies',
    type: BaseMovie,
    isArray: true,
  })
  @ApiBadGatewayResponse({
    description: 'Bad gateway',
  })
  @ApiNotFoundResponse({
    description: 'Movies not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get()
  getUpcoming() {
    return this.upcomingService.getUpcoming()
  }

  @ApiOkResponse({
    description: 'Retrieve an upcoming movie',
    type: BaseMovie,
    isArray: true,
  })
  @ApiBadGatewayResponse({
    description: 'Bad gateway',
  })
  @ApiNotFoundResponse({
    description: 'Movie not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get(':movie_id')
  getUpcomingById(@Param('movie_id') movieId: string) {
    return this.upcomingService.getUpcomingById(movieId)
  }
}
