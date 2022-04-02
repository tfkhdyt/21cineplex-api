import { Test, TestingModule } from '@nestjs/testing'
import { TheatersService } from './theaters.service'

describe('TheatersService', () => {
  let service: TheatersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TheatersService],
    }).compile()

    service = module.get<TheatersService>(TheatersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
