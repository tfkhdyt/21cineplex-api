import { ApiProperty } from '@nestjs/swagger'
import Time from './time.entity'

export default class PlayTime {
  @ApiProperty()
  date: string
  price: string
  time: Time[]
}
