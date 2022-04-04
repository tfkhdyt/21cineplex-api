import { ApiProperty } from '@nestjs/swagger'

export default class Time {
  @ApiProperty()
  hour: string

  @ApiProperty({ enum: ['available', 'unavailable'] })
  status: 'available' | 'unavailable'
}
