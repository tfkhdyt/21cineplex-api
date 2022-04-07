import { Module } from '@nestjs/common'
import { AxiosModule } from 'src/axios/axios.module'
import { PlayingController } from './playing.controller'
import { PlayingService } from './playing.service'

@Module({
  imports: [AxiosModule],
  controllers: [PlayingController],
  providers: [PlayingService],
})
export class PlayingModule {}
