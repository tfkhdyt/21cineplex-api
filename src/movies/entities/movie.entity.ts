import { ApiProperty } from '@nestjs/swagger'
import BaseMovie from './base-movie.entity'

export default class Movie extends BaseMovie {
  @ApiProperty()
  genre: string[]
  duration: string
  trailerUrl: string
  description: string
  producer: string[]
  director: string[]
  writer: string[]
  cast: string[]
  distributor: string[]
  website: string
}
