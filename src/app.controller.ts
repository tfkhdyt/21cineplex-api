import { Controller, Get, Redirect } from '@nestjs/common'

@Controller()
export class AppController {
  @Get()
  @Redirect('/docs', 301)
  redirectToSwaggerDocs() {}
}
