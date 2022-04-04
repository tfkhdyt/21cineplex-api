import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { SchedulesService } from './schedules.service'

@ApiTags('schedules')
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Get(':theaterId')
  getSchedules(@Param('theaterId') theaterId: string) {
    return this.schedulesService.getSchedules(theaterId)
  }

  @Get(':theaterId/:movieId')
  getScheduleByMovieId(
    @Param('theaterId') theaterId: string,
    @Param('movieId') movieId: string,
  ) {
    return this.schedulesService.getScheduleByMovieId(theaterId, movieId)
  }
}
