import { Test, TestingModule } from '@nestjs/testing'
import { FoodsService } from './foods.service'

describe('FoodsService', () => {
  let service: FoodsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodsService],
    }).compile()

    service = module.get<FoodsService>(FoodsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
