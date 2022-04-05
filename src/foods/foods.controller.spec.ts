import { Test, TestingModule } from '@nestjs/testing'
import { FoodsController } from './foods.controller'

describe('FoodsController', () => {
  let controller: FoodsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodsController],
    }).compile()

    controller = module.get<FoodsController>(FoodsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
