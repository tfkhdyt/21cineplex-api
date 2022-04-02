import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import axios from 'axios'
import { load } from 'cheerio'
// import pretty from 'pretty'
import Theater from 'src/types/Theater'
import Theaters from 'src/types/Theaters'

@Injectable()
export class TheatersService {
  private readonly theatersUrl =
    'https://m.21cineplex.com/gui.list_theater.php?sid='

  getTheater(cityId: number) {
    return this.scrapeTheater(cityId)
  }

  private async scrapeTheater(cityId: number) {
    const { data: html } = await axios
      .get(`${this.theatersUrl}&city_id=${cityId}`)
      .catch((err) => {
        throw new BadGatewayException(err.message)
      })
    if (!html) throw new NotFoundException()

    const $ = load(html)

    const theaters: Theaters = {
      XXI: null,
      premiere: null,
      imax: null,
    }

    $('.nav_theater_content')
      .children('div')
      .each((_, el) => {
        let theaterName = $(el).attr('class')
        theaterName = theaterName === 'all' ? 'XXI' : theaterName
        const theaters2: Theater[] = []
        $(el)
          .children('li')
          .each((_, el) => {
            const theater: Theater = {
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

    return theaters
  }
}
