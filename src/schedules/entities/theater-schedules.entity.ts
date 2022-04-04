import { ApiProperty } from '@nestjs/swagger'
import Theater from 'src/theaters/entities/theater.entity'
import Schedule from './schedule.entity'

export default class TheaterSchedule {
  @ApiProperty()
  theater: Theater
  schedules: Schedule[]
}
