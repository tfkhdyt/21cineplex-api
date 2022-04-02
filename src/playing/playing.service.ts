import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import axios from 'axios'
import { load } from 'cheerio'
import pretty from 'pretty'
import Movie from 'src/types/Movie'

@Injectable()
export class PlayingService {
  private readonly playingUrl = 'https://m.21cineplex.com/index.php'

  getPlaying() {
    return this.scrapePlaying()
  }

  private async scrapePlaying() {
    const response = await axios.get(this.playingUrl).catch((err) => {
      throw new BadGatewayException(err.message)
    })
    const html = response.data
    if (!html) throw new NotFoundException()
    const $ = load(html)

    console.log(pretty(html))

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
      movie.title = $(el).children('.title').text()
      movie.type = $(el).find('.rating span.btn').text()
      movie.rating = $(el).find('.rating a.btn').text()
      movie.bannerUrl = $(el).find('img').attr('src')
      movies.push(movie)
    })

    // return html
    return movies
  }
}
