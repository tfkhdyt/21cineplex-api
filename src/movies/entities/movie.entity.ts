import BaseMovie from './base-movie.entity'

export default class Movie extends BaseMovie {
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
