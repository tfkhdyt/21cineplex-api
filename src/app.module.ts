import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CitiesModule } from './cities/cities.module'
import { TheatersModule } from './theaters/theaters.module'
import { UpcomingModule } from './upcoming/upcoming.module'
import { SchedulesModule } from './schedules/schedules.module';

@Module({
  imports: [CitiesModule, TheatersModule, UpcomingModule, SchedulesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
