import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CitiesModule } from './cities/cities.module'
import { PlayingModule } from './playing/playing.module';

@Module({
  imports: [CitiesModule, PlayingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
