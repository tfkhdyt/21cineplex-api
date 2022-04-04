import BaseMovie from 'src/movies/entities/base-movie.entity'
import PlayTime from './playtime.entity'

export default class Schedule {
  movie: MovieDetail
  playTime: PlayTime[]
}

class MovieDetail extends BaseMovie {
  duration: string
}
