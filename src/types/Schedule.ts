import Movie from './Movie'

export default interface Schedule {
  theater: {
    name: string
    address: string
    phoneNumber: string
    locationUrl: string
  }
  schedules: Schedules[]
}

export interface Schedules {
  movie: MovieDetail
  playTime: PlayTime[]
}

export interface PlayTime {
  date: string
  price: string
  time: Time[]
}

export interface Time {
  hour: string
  status: 'available' | 'unavailable'
}

interface MovieDetail extends Movie {
  duration: string
}
