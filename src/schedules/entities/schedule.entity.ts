import { ApiProperty } from '@nestjs/swagger'
import BaseMovie from 'src/movies/entities/base-movie.entity'
import PlayTime from './playtime.entity'

class MovieDetail extends BaseMovie {
  duration: string
}

export default class Schedule {
  @ApiProperty()
  movie: MovieDetail
  playTime: PlayTime[]
}
