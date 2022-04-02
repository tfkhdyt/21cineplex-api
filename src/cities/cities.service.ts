import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import axios from 'axios'
import pretty from 'pretty'
import { load } from 'cheerio'

import Region from '../types/City'

@Injectable()
export class CitiesService {
  private readonly citiesUrl = 'https://m.21cineplex.com/gui.list_city.php?sid='

  getCities() {
    return this.scrapeCity()
  }

  private async scrapeCity() {
    const response = await axios.get(this.citiesUrl).catch((err) => {
      throw new BadGatewayException(err.message)
    })
    const html = response.data

    if (!html) throw new NotFoundException()

    // console.log(pretty(html as string))
    const $ = load(html)
    const listItems = $('ul.list-group li')
    const regions = []

    listItems.each((_, el) => {
      const region: Region = {
        id: null,
        name: null,
      }
      region.name = $(el).children('div').text()
      region.id = Number(
        $(el)
          .children('div')
          .attr('onclick')
          .split("'")[1]
          .replace('gui.list_theater.php?sid=&city_id=', ''),
      )
      regions.push(region)
    })
    return regions
  }
}
