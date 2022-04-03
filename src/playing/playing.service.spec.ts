import { Test, TestingModule } from '@nestjs/testing'
import { PlayingService } from './playing.service'

describe('PlayingService', () => {
  let service: PlayingService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayingService],
    }).compile()

    service = module.get<PlayingService>(PlayingService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
