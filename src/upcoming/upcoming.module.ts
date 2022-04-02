import { Module } from '@nestjs/common'
import { UpcomingController } from './upcoming.controller'
import { UpcomingService } from './upcoming.service'

@Module({
  controllers: [UpcomingController],
  providers: [UpcomingService],
})
export class UpcomingModule {}
