import BaseTheater from './base-theater.entity'
import { ApiProperty } from '@nestjs/swagger'

export default class TheaterDetail extends BaseTheater {
  @ApiProperty({ enum: ['XXI', 'premiere', 'imax'] })
  type: 'XXI' | 'premiere' | 'imax'
}
