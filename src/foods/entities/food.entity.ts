import { ApiProperty } from '@nestjs/swagger'

export default class Food {
  @ApiProperty()
  name: string
  description: string
  price: string
  pictureUrl: string
}
