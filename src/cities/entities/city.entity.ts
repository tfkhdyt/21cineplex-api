import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'

export default class City {
  @ApiProperty()
  @IsNumber()
  id: number
  name: string
}
