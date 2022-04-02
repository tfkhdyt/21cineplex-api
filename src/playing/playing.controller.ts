import { Controller, Get } from '@nestjs/common'
import { PlayingService } from './playing.service'

@Controller('playing')
export class PlayingController {
  constructor(private readonly playingService: PlayingService) {}

  @Get()
  getPlaying() {
    return this.playingService.getPlaying()
  }
}
