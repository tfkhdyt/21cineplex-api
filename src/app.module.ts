import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'
import { Module } from '@nestjs/common'

import { SchedulesModule } from './schedules/schedules.module'
import { TheatersModule } from './theaters/theaters.module'
import { UpcomingModule } from './upcoming/upcoming.module'
import { PlayingModule } from './playing/playing.module'
import { CitiesModule } from './cities/cities.module'
import { MoviesModule } from './movies/movies.module'
import { FoodsModule } from './foods/foods.module'
import { AppController } from './app.controller'
import { AxiosModule } from './axios/axios.module'

@Module({
  imports: [
    CitiesModule,
    TheatersModule,
    UpcomingModule,
    SchedulesModule,
    PlayingModule,
    MoviesModule,
    FoodsModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    AxiosModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
