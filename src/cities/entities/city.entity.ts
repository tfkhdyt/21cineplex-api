import { IsNumber } from 'class-validator'

export default class City {
  @IsNumber()
  id: number
  name: string
}
