import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CitiesModule } from './cities/cities.module';

@Module({
  imports: [CitiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
