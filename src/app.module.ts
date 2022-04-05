import { Module } from '@nestjs/common'
import { CitiesModule } from './cities/cities.module'
import { TheatersModule } from './theaters/theaters.module'
import { UpcomingModule } from './upcoming/upcoming.module'
import { SchedulesModule } from './schedules/schedules.module'
import { PlayingModule } from './playing/playing.module'
import { MoviesModule } from './movies/movies.module'
import { AppController } from './app.controller'
import { FoodsModule } from './foods/foods.module'

@Module({
  imports: [
    CitiesModule,
    TheatersModule,
    UpcomingModule,
    SchedulesModule,
    PlayingModule,
    MoviesModule,
    FoodsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
