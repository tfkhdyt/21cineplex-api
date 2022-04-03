import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import axios from 'axios'
import { load } from 'cheerio'
// import pretty from 'pretty'
import Movie from 'src/types/Movie'

@Injectable()
export class UpcomingService {
  private readonly upcomingUrl =
    'https://m.21cineplex.com/gui.coming_soon.php?order=2&sid='

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
    const { data: html } = await axios.get(this.upcomingUrl).catch((err) => {
      throw new BadGatewayException(err.message)
    })
    if (!html) throw new NotFoundException()

    const $ = load(html)
    // console.log(pretty($.html()))

    const movies: Movie[] = []

    $('.grid_movie').each((_, el) => {
      const movie: Movie = {
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

    return movies
  }
}
