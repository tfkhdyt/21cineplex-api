import { Module } from '@nestjs/common'
import { AxiosModule } from 'src/axios/axios.module'
import { UpcomingController } from './upcoming.controller'
import { UpcomingService } from './upcoming.service'

@Module({
  imports: [AxiosModule],
  controllers: [UpcomingController],
  providers: [UpcomingService],
})
export class UpcomingModule {}
