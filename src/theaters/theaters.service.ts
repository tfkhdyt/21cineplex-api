import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { load } from 'cheerio'

import TheaterDetail from './entities/theater-detail.entity'
import BaseTheater from './entities/base-theater.entity'
import TheaterType from './entities/theater-type.entity'
import { AxiosService } from 'src/axios/axios.service'

@Injectable()
export class TheatersService {
  private readonly theatersUrl = 'gui.list_theater.php?sid='

  constructor(private readonly axiosService: AxiosService) {}

  getTheaters(cityId: number) {
    return this.scrapeTheater(cityId)
  }

  async getTheaterByTheaterId(
    theaterId: string,
    cityId: number,
  ): Promise<TheaterDetail> {
    const theaters = await this.scrapeTheater(cityId)

    const xxi = theaters.XXI.find((theater) => theater.id === theaterId)
    if (xxi) return { ...xxi, type: 'XXI' }

    const premiere = theaters.premiere.find(
      (theater) => theater.id === theaterId,
    )
    if (premiere) return { ...premiere, type: 'premiere' }

    const imax = theaters.imax.find((theater) => theater.id === theaterId)
    if (imax) return { ...imax, type: 'imax' }

    throw new NotFoundException()
  }

  private async scrapeTheater(cityId: number): Promise<TheaterType> {
    const { data: html } = await this.axiosService.request
      .get(`${this.theatersUrl}&city_id=${cityId}`)
      .catch((err) => {
        throw new BadGatewayException(err.message)
      })
    if (!html) throw new NotFoundException()

    const $ = load(html)

    const theaters: TheaterType = {
      XXI: null,
      premiere: null,
      imax: null,
    }

    $('.nav_theater_content')
      .children('div')
      .each((_, el) => {
        let theaterName = $(el).attr('class')
        theaterName = theaterName === 'all' ? 'XXI' : theaterName
        const theaters2: BaseTheater[] = []
        $(el)
          .children('li')
          .each((_, el) => {
            const theater: BaseTheater = {
              id: null,
              name: null,
            }

            theater.id = $(el)
              .find('div')
              .attr('onclick')
              .split("'")[1]
              .replace('gui.schedule.php?sid=&find_by=1&cinema_id=', '')
              .replace('&movie_id=', '')

            theater.name = $(el).find('div').text()
            theaters2.push(theater)
          })
        theaters[theaterName] = theaters2
        // theaters.push({ [theaterName]: theaters2 })
      })

    if (
      theaters.XXI.length == 0 &&
      theaters.imax.length == 0 &&
      theaters.premiere.length == 0
    )
      throw new NotFoundException()
    return theaters
  }
}
