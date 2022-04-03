import { Test, TestingModule } from '@nestjs/testing'
import { PlayingController } from './playing.controller'

describe('PlayingController', () => {
  let controller: PlayingController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayingController],
    }).compile()

    controller = module.get<PlayingController>(PlayingController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
