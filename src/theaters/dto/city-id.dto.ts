import { ApiProperty } from '@nestjs/swagger'

export default class CityId {
  @ApiProperty({ default: 10, required: false })
  city_id: number
}
