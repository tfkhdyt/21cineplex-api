import { Module } from '@nestjs/common'
import { AxiosModule } from 'src/axios/axios.module'
import { TheatersController } from './theaters.controller'
import { TheatersService } from './theaters.service'

@Module({
  imports: [AxiosModule],
  controllers: [TheatersController],
  providers: [TheatersService],
})
export class TheatersModule {}
