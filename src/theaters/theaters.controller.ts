import {
  BadRequestException,
  Controller,
  Get,
  Param,
  // ParseIntPipe,
  Query,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
// import GetTheaterDto from './dto/get-theater.dto'
import { TheatersService } from './theaters.service'

@ApiTags('theaters')
@Controller('theaters')
export class TheatersController {
  constructor(private readonly theatersService: TheatersService) {}

  @Get()
  getTheatersByCityId(@Query('city_id') cityId = 10) {
    if (!Number(cityId))
      throw new BadRequestException('city_id should be number')
    return this.theatersService.getTheaters(cityId)
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
