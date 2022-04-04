import { Controller, Get, Redirect } from '@nestjs/common'
import { ApiExcludeController } from '@nestjs/swagger'

@ApiExcludeController()
@Controller()
export class AppController {
  @Get()
  @Redirect('/docs', 301)
  redirectToSwaggerDocs() {
    return
  }
}
