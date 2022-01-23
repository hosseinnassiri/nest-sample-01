import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //const loggerService = app.get(Logger);
  const logger = new Logger();


  // SWAGGER
  const optionsSwagger = new DocumentBuilder()
    .setTitle('NestJS Typescript Boilerplate')
    .setDescription('The NestJS API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, optionsSwagger);
  SwaggerModule.setup('swagger', app, document);

  const port = process.env.PORT || 3000;

  await app.listen(port);
  logger.log(`App running on port ${port}`)
}

bootstrap();
