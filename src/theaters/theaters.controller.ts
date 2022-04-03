import {
  BadRequestException,
  Controller,
  Get,
  Param,
  // ParseIntPipe,
  Query,
} from '@nestjs/common'
// import GetTheaterDto from './dto/get-theater.dto'
import { TheatersService } from './theaters.service'

@Controller('theaters')
export class TheatersController {
  constructor(private readonly theatersService: TheatersService) {}

  @Get()
  getTheaterByCityId(@Query('city_id') cityId = 10) {
    if (!Number(cityId))
      throw new BadRequestException('city_id should be number')
    return this.theatersService.getTheater(cityId)
  }

  @Get(':theaterId')
  getTheaterByTheaterId(
    @Param('theaterId') theaterId: string,
    @Query('city_id') cityId = 10,
  ) {
    if (!Number(cityId))
      throw new BadRequestException('city_id should be number')
    return this.theatersService.getTheaterByTheaterId(theaterId, cityId)
  }
}
