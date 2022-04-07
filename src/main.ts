import {
  DocumentBuilder,
  ExpressSwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import helmet from 'helmet'

import { AppModule } from './app.module'

const PORT = process.env.PORT || 3000
declare const module: any

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(helmet())
  app.use(compression())
  app.use(cookieParser())
  // app.use(csurf())
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())

  const options = new DocumentBuilder()
    .setTitle('21Cineplex API')
    .setDescription('CinemaXXI API using web scraping technique')
    .setVersion('v1')
    .build()
  const document = SwaggerModule.createDocument(app, options)

  const costumOptions: ExpressSwaggerCustomOptions = {
    customSiteTitle: '21Cineplex API',
  }

  SwaggerModule.setup('docs', app, document, costumOptions)

  await app.listen(PORT)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}
bootstrap()
