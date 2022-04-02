import { Test, TestingModule } from '@nestjs/testing'
import { UpcomingService } from './upcoming.service'

describe('UpcomingService', () => {
  let service: UpcomingService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpcomingService],
    }).compile()

    service = module.get<UpcomingService>(UpcomingService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
