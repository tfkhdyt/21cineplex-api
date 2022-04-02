import { Test, TestingModule } from '@nestjs/testing'
import { TheatersController } from './theaters.controller'

describe('TheatersController', () => {
  let controller: TheatersController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TheatersController],
    }).compile()

    controller = module.get<TheatersController>(TheatersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
