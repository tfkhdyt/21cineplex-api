import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UpcomingService } from './upcoming.service'

@ApiTags('upcoming')
@Controller('upcoming')
export class UpcomingController {
  constructor(private readonly upcomingService: UpcomingService) {}

  @Get()
  getUpcoming() {
    return this.upcomingService.getUpcoming()
  }

  @Get(':id')
  getUpcomingById(@Param('id') movieId: string) {
    return this.upcomingService.getUpcomingById(movieId)
  }
}
