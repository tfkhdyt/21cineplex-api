import { Test, TestingModule } from '@nestjs/testing'
import { UpcomingController } from './upcoming.controller'

describe('UpcomingController', () => {
  let controller: UpcomingController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpcomingController],
    }).compile()

    controller = module.get<UpcomingController>(UpcomingController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
