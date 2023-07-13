import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.API_PREFIX) {
    app.setGlobalPrefix(process.env.API_PREFIX);
  }

  const config = new DocumentBuilder()
    .setTitle('TEST : ZAGROZA Server')
    .setDescription('ZAGROZA Server REST API')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, { swaggerOptions: { tagsSorter: 'alpha', operationsSorter: 'alpha' } });

  await app.listen(3000);
}
bootstrap();
