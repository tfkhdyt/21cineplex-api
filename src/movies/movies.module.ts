import { Module } from '@nestjs/common'
import { AxiosModule } from 'src/axios/axios.module'
import { MoviesController } from './movies.controller'
import { MoviesService } from './movies.service'

@Module({
  imports: [AxiosModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
