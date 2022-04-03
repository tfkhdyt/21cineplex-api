import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import axios from 'axios'
// import pretty from 'pretty'
import { load } from 'cheerio'

import Region from '../types/City'

@Injectable()
export class CitiesService {
  private readonly citiesUrl = 'https://m.21cineplex.com/gui.list_city.php?sid='

  getCities() {
    return this.scrapeCity()
  }

  async getCity(id: number) {
    const cities = await this.scrapeCity()
    const searchedCity = cities.find((city) => city.id === id)
    if (!searchedCity || typeof searchedCity == null) {
      throw new NotFoundException()
    }
    return searchedCity
  }

  private async scrapeCity(): Promise<Region[]> {
    const response = await axios.get(this.citiesUrl).catch((err) => {
      throw new BadGatewayException(err.message)
    })
    const html = response.data

    if (!html) throw new NotFoundException()

    // console.log(pretty(html as string))
    const $ = load(html)
    const listItems = $('ul.list-group li')
    const regions: Region[] = []

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
