import Theater from 'src/theaters/entities/theater.entity'
import Schedule from './schedule.entity'

export default class TheaterSchedule {
  theater: Theater
  schedules: Schedule[]
}
