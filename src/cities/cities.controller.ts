import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { CitiesService } from './cities.service'

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  getCities() {
    return this.citiesService.getCities()
  }

  @Get(':id')
  getCity(@Param('id', ParseIntPipe) id = 10) {
    return this.citiesService.getCity(id)
  }
}
