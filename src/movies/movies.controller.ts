import { Controller, Get, Param } from '@nestjs/common'
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import Movie from './entities/movie.entity'
import { MoviesService } from './movies.service'

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @ApiOkResponse({
    description: 'Retrieve a movie information',
    type: Movie,
  })
  @ApiNotFoundResponse({
    description: 'Movie not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get(':movie_id')
  findMovieById(@Param('movie_id') movieId: string) {
    return this.moviesService.findMovieById(movieId)
  }
}
