import { Injectable } from '@nestjs/common'
import axios, { Axios } from 'axios'

@Injectable()
export class AxiosService {
  readonly request: Axios

  constructor() {
    this.request = axios.create({
      baseURL: 'https://m.21cineplex.com',
    })
  }
}
