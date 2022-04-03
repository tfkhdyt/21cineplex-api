import { Module } from '@nestjs/common'
import { PlayingController } from './playing.controller'
import { PlayingService } from './playing.service'

@Module({
  controllers: [PlayingController],
  providers: [PlayingService],
})
export class PlayingModule {}
