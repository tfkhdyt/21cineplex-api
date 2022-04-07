import { Module } from '@nestjs/common'
import { AxiosModule } from 'src/axios/axios.module'
import { FoodsController } from './foods.controller'
import { FoodsService } from './foods.service'

@Module({
  imports: [AxiosModule],
  controllers: [FoodsController],
  providers: [FoodsService],
})
export class FoodsModule {}
