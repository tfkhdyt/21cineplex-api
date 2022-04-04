import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import axios from 'axios'
import { load } from 'cheerio'
import BaseMovie from 'src/movies/entities/base-movie.entity'
// import pretty from 'pretty'
// import Movie from 'src/types/Movie'

@Injectable()
export class PlayingService {
  private readonly setRegionUrl =
    'https://m.21cineplex.com/gui.list_theater.php?sid=&city_id='
  private readonly playingUrl = 'https://m.21cineplex.com/index.php?sid='

  getPlayings(cityId: number) {
    return this.scrapePlayings(cityId)
  }

  async getPlayingById(movieId: string, cityId: number) {
    const playings = await this.scrapePlayings(cityId)
    const searchedPlaying = playings.find((playing) => playing.id === movieId)
    if (!searchedPlaying) throw new NotFoundException()
    return searchedPlaying
  }

  private async scrapePlayings(cityId: number) {
    const response = await axios
      .get(this.setRegionUrl + cityId)
      .catch((err) => {
        throw new BadGatewayException(err.message)
      })
    const cookie = response.headers['set-cookie'].join(';')
    const { data: html } = await axios
      .get(this.playingUrl, {
        headers: {
          cookie,
        },
      })
      .catch((err) => {
        throw new NotFoundException(err.message)
      })

    const $ = load(html)

    const playings: BaseMovie[] = []

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

      playings.push(movie)
      // console.log(idx + 1, $(el).html())
    })
    return playings
    // console.log(pretty($.html()))
  }
}
