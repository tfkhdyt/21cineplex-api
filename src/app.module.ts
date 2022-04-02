import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CitiesModule } from './cities/cities.module'
import { TheatersModule } from './theaters/theaters.module'
import { UpcomingModule } from './upcoming/upcoming.module'

@Module({
  imports: [CitiesModule, TheatersModule, UpcomingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
