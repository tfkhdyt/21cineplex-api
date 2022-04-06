import {
  ApiBadGatewayResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { Controller, Get, Param } from '@nestjs/common'

import TheaterSchedule from './entities/theater-schedules.entity'
import { SchedulesService } from './schedules.service'
import Schedule from './entities/schedule.entity'

@ApiTags('schedules')
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @ApiOkResponse({
    description: 'Retrieve all schedules by theater_id',
    type: TheaterSchedule,
  })
  @ApiBadGatewayResponse({
    description: 'Bad gateway',
  })
  @ApiNotFoundResponse({
    description: 'Schedules not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get(':theater_id')
  getSchedules(@Param('theater_id') theaterId: string) {
    return this.schedulesService.getSchedules(theaterId)
  }

  @ApiOkResponse({
    description: 'Retrieve a schedule by theater_id and movie_id',
    type: Schedule,
  })
  @ApiBadGatewayResponse({
    description: 'Bad gateway',
  })
  @ApiNotFoundResponse({
    description: 'Schedules not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get(':theater_id/:movie_id')
  getScheduleByMovieId(
    @Param('theater_id') theaterId: string,
    @Param('movie_id') movieId: string,
  ) {
    return this.schedulesService.getScheduleByMovieId(theaterId, movieId)
  }
}
