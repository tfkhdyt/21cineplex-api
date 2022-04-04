import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common'
import { PlayingService } from './playing.service'

@Controller('playing')
export class PlayingController {
  constructor(private readonly playingService: PlayingService) {}

  @Get()
  getPlayings(@Query('city_id') cityId = 10) {
    if (!Number(cityId))
      throw new BadRequestException('city_id should be number')
    return this.playingService.getPlayings(cityId)
  }

  @Get(':id')
  getPlayingById(@Param('id') movieId: string, @Query('city_id') cityId = 10) {
    if (!Number(cityId)) {
      throw new BadRequestException('city_id should be number')
    }
    return this.playingService.getPlayingById(movieId, cityId)
  }
}
