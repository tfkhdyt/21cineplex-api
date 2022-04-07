import { Module } from '@nestjs/common'
import { AxiosModule } from 'src/axios/axios.module'
import { SchedulesController } from './schedules.controller'
import { SchedulesService } from './schedules.service'

@Module({
  imports: [AxiosModule],
  controllers: [SchedulesController],
  providers: [SchedulesService],
})
export class SchedulesModule {}
