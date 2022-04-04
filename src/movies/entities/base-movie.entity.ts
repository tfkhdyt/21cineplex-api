import { ApiProperty } from '@nestjs/swagger'

export default class BaseMovie {
  @ApiProperty()
  id: string
  title: string
  type: string
  rating: string
  bannerUrl: string
}
