import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import {
  DocumentBuilder,
  ExpressSwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger'
import cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

const PORT = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({ origin: '*' })
  app.use(cookieParser())
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
}
bootstrap()
