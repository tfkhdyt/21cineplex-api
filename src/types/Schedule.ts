import Movie from './Movie'

export default interface Schedule {
  theater: {
    name: string
    address: string
    phoneNumber: string
  }
  schedules: Schedules[]
}

interface Schedules extends Movie {
  duration: string
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
