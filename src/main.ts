import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { AppOptions } from './utils/winston.helper';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create<NestExpressApplication>(AppModule, AppOptions);
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // swagger config
  const options = new DocumentBuilder()
    .setTitle('Post Project')
    .setDescription('App For Code Test.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
    },
  };
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(process.env.SWAGGER_ROUTE, app, document, customOptions);

  SwaggerModule.setup(process.env.SWAGGER_ROUTE, app, document, customOptions);

  await app.listen(process.env.SERVER_PORT);

  // Graceful shutdown
  async function gracefulShutdown(): Promise<void> {
    const logger = new Logger('Shutdown');
    logger.log('Starting graceful shutdown...');

    try {
      // Close any resources or connections here
      // For example, closing the database connection
      await app.close();
      logger.log('Database connection closed');
    } catch (error) {
      logger.error(`Error closing database connection: ${error}`);
    }
    // Exiting the process
    process.exit(0);
  }

  // Registering signal handlers
  process.on('SIGINT', () => {
    void gracefulShutdown();
  }); // Ctrl+C
  process.on('SIGTERM', () => {
    void gracefulShutdown();
  }); // Termination signal

  logger.log('Application is listening on port 3000');
}
bootstrap();
