import { IsNotEmpty, IsNumber } from 'class-validator'

export default class GetTheaterDto {
  @IsNumber()
  @IsNotEmpty()
  cityId: number
}
