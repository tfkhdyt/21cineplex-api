import { ApiProperty } from '@nestjs/swagger'
import BaseTheater from './base-theater.entity'

export default class TheaterType {
  @ApiProperty()
  XXI: BaseTheater[]
  premiere: BaseTheater[]
  imax: BaseTheater[]
}
