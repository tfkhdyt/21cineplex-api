import { Injectable, NotFoundException } from '@nestjs/common'
import { load } from 'cheerio'

import { AxiosService } from 'src/axios/axios.service'
import Movie from './entities/movie.entity'
// import pretty from 'pretty'

@Injectable()
export class MoviesService {
  private readonly movieUrl = 'gui.movie_details.php?sid='

  constructor(private readonly axiosService: AxiosService) {}

  findMovieById(movieId: string) {
    return this.scrapeMovie(movieId)
  }

  private async scrapeMovie(movieId: string) {
    const { data: html } = await this.axiosService.request
      .get(`${this.movieUrl}&movie_id=${movieId}`)
      .catch((err) => {
        throw new NotFoundException(err.message)
      })

    const $ = load(html)

    const movie: Movie = {
      id: null,
      title: null,
      type: null,
      rating: null,
      genre: [],
      duration: null,
      bannerUrl: null,
      trailerUrl: null,
      description: null,
      producer: [],
      director: [],
      writer: [],
      cast: [],
      distributor: [],
      website: null,
    }

    movie.id = movieId
    movie.title = $(
      'div.col-xs-8.col-sm-11.col-md-11[style="font-weight: bold"] > div',
    ).text()
    movie.type = $('a.btn.disabled').text().trim()
    movie.rating = $('img[height="50"]')
      .attr('src')
      .split('/')[1]
      .split('.')[0]
      .toUpperCase()
    movie.bannerUrl = $('img.img-responsive').attr('src')
    movie.duration = $('.glyphicon-time').parent().text().trim()
    movie.description = $('#description').text()
    movie.producer = $('strong:contains("Producer")')
      .parent()
      .next()
      .text()
      .split(',')
      .map((value) => value.trim())
    movie.director = $('strong:contains("Director")')
      .parent()
      .next()
      .text()
      .split(',')
      .map((value) => value.trim())
    movie.writer = $('strong:contains("Writer")')
      .parent()
      .next()
      .text()
      .split(',')
      .map((value) => value.trim())
    movie.cast = $('strong:contains("Cast")')
      .parent()
      .next()
      .text()
      .split(',')
      .map((value) => value.trim())
    movie.genre = $('div.col-xs-8.col-sm-11.col-md-11')
      .next()
      .find('div')
      .text()
      .split(',')
      .map((value) => value.trim())
    movie.distributor = $('strong:contains("Distributor")')
      .parent()
      .next()
      .text()
      .split(',')
      .map((value) => value.trim())
    movie.website = $('strong:contains("Website")')
      .parent()
      .next()
      .find('a')
      .attr('href')
    movie.trailerUrl = $('button:contains("TRAILER")')
      .attr('onclick')
      .split("'")[1]

    // console.log(pretty($('.main-content').html(), { ocd: true }))

    // console.log($('strong:contains("Producer:")').text())

    return movie
  }
}
