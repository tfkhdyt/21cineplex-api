import { Module } from '@nestjs/common'
import { AxiosModule } from 'src/axios/axios.module'
import { CitiesController } from './cities.controller'
import { CitiesService } from './cities.service'

@Module({
  imports: [AxiosModule],
  controllers: [CitiesController],
  providers: [CitiesService],
})
export class CitiesModule {}
