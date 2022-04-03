import Movie from './Movie'

export default interface Schedule {
  theater: {
    name: string
    address: string
    phoneNumber: string
  }
  schedules: Schedules[]
}

export interface Schedules {
  movie: MovieDetail
  playTime: PlayTime[]
}

interface PlayTime {
  date: string
  price: string
  time: Time[]
}

interface Time {
  hour: string
  status: 'available' | 'sold out'
}

interface MovieDetail extends Movie {
  duration: string
}
