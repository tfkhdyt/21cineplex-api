import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
// import GetTheaterDto from './dto/get-theater.dto'
import { TheatersService } from './theaters.service'

@Controller('theaters')
export class TheatersController {
  constructor(private readonly theatersService: TheatersService) {}

  @Get(':id')
  getTheater(@Param('id', ParseIntPipe) cityId: number) {
    return this.theatersService.getTheater(cityId)
  }
}
