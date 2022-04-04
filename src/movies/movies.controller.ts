import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { MoviesService } from './movies.service'

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get(':movieId')
  findMovieById(@Param('movieId') movieId: string) {
    return this.moviesService.findMovieById(movieId)
  }
}
