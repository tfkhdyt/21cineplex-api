import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import axios from 'axios'
import { load } from 'cheerio'
import pretty from 'pretty'
import Schedule, { Schedules } from 'src/types/Schedule'

@Injectable()
export class SchedulesService {
  private readonly schedulesUrl =
    'https://m.21cineplex.com/gui.schedule.php?sid=&find_by=1&cinema_id='

  getSchedule(theaterId: string) {
    return this.scrapeSchedule(theaterId)
  }

  private async scrapeSchedule(theaterId: string) {
    const { data: html } = await axios
      .get(this.schedulesUrl + theaterId)
      .catch((err) => {
        throw new BadGatewayException(err.message)
      })
    if (!html) throw new NotFoundException()

    const $ = load(html)

    // console.log(pretty($.html()))

    const schedules: Schedule = {
      theater: {
        name: null,
        address: null,
        phoneNumber: null,
      },
      schedules: [],
    }

    schedules.theater.name = $('h4 > span > strong').text()
    schedules.theater.address = $('h4 > span[style="font-size:14px"]')
      .html()
      .replace(/<br\s*\/?>/gi, ' ')
      .split('TELEPON:')[0]
      .trim()
    schedules.theater.phoneNumber = $('h4 > span[style="font-size:14px"]')
      .text()
      .split('TELEPON:')[1]
      .trim()

    $('li.list-group-item').each((idx, el) => {
      const movieSchedule: Schedules = {
        movie: {
          id: null,
          title: null,
          type: null,
          rating: null,
          bannerUrl: null,
          duration: null,
        },
        playTime: [],
      }
      movieSchedule.movie.id = $(el)
        .children('a')
        .attr('href')
        .split('movie_id=')[1]
      movieSchedule.movie.title = $(el).children('a').next().text()
      movieSchedule.movie.type = $(el).find('span.btn').first().text()
      movieSchedule.movie.rating = $(el).find('span.btn').first().next().text()
      movieSchedule.movie.bannerUrl = $(el).find('img').attr('src')
      movieSchedule.movie.duration = $(el)
        .find('span.glyphicon-time')
        .parent()
        .text()
        .trim()

      console.log(idx + 1, pretty($(el).html()))
      schedules.schedules.push(movieSchedule)
    })

    return schedules
  }
}
