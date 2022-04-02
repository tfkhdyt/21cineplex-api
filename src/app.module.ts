import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CitiesModule } from './cities/cities.module'
import { TheatersModule } from './theaters/theaters.module'

@Module({
  imports: [CitiesModule, TheatersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
