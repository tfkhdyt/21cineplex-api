import { Module } from '@nestjs/common'
import { TheatersController } from './theaters.controller'
import { TheatersService } from './theaters.service'

@Module({
  controllers: [TheatersController],
  providers: [TheatersService],
})
export class TheatersModule {}
