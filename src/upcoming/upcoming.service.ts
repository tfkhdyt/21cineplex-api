import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { load } from 'cheerio'

import BaseMovie from 'src/movies/entities/base-movie.entity'
import { AxiosService } from 'src/axios/axios.service'

// import pretty from 'pretty'

@Injectable()
export class UpcomingService {
  private readonly upcomingUrl = 'gui.coming_soon.php?order=2&sid='

  constructor(private readonly axiosService: AxiosService) {}

  getUpcoming() {
    return this.scrapeUpcoming()
  }

  async getUpcomingById(movieId: string) {
    const movies = await this.scrapeUpcoming()
    const searchedMovie = movies.find((movie) => movie.id === movieId)
    if (!searchedMovie) throw new NotFoundException()

    return searchedMovie
  }

  private async scrapeUpcoming() {
    const { data: html } = await this.axiosService.request
      .get(this.upcomingUrl)
      .catch((err) => {
        throw new BadGatewayException(err.message)
      })
    if (!html) throw new NotFoundException()

    const $ = load(html)
    // console.log(pretty($.html()))

    const movies: BaseMovie[] = []

    $('.grid_movie').each((_, el) => {
      const movie: BaseMovie = {
        id: null,
        title: null,
        type: null,
        rating: null,
        bannerUrl: null,
      }

      movie.id = $(el).find('img').attr('id')
      movie.title = $(el).find('.title').text()
      movie.type = $(el).find('.rating > span').text()
      movie.rating = $(el).find('.rating > a').text()
      movie.bannerUrl = $(el).find('img').attr('src')

      movies.push(movie)
    })

    // console.log('upcoming movies', movies)
    return movies
  }
}
