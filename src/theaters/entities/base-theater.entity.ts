import { ApiProperty } from '@nestjs/swagger'

export default class BaseTheater {
  @ApiProperty()
  id: string
  name: string
}
