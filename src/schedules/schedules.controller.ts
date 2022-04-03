import { Controller, Get, Param } from '@nestjs/common'
import { SchedulesService } from './schedules.service'

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Get(':theaterId')
  getSchedule(@Param('theaterId') theaterId: string) {
    return this.schedulesService.getSchedule(theaterId)
  }
}
